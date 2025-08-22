// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title EGLIFEStaking
 * @author EGLIFE Team
 * @notice A smart contract for staking EGLIFE tokens with a tiered APY system
 * and a 10-level referral program, built on the BNB Smart Chain.
 */
contract EGLIFEStaking is Ownable, ReentrancyGuard {
    // --- Events ---
    event Staked(
        address indexed user,
        uint256 amount,
        address indexed sponsor
    );
    event Unstaked(
        address indexed user,
        uint256 principal,
        uint256 reward
    );
    event ReferralBonusPaid(
        address indexed referrer,
        address indexed referral,
        uint256 level,
        uint256 bonusAmount
    );
    event TiersUpdated();
    event ReferralBonusesUpdated();
    event LockPeriodUpdated(uint256 newLockPeriod);
    event EarlyUnstakePenaltyUpdated(uint256 newPenalty);

    // --- State Variables ---

    // The EGLIFE token contract
    IERC20 public immutable EGLIFE_TOKEN;

    // Staking configuration
    struct Stake {
        uint256 amount;
        uint256 startTime;
        address sponsor;
    }
    mapping(address => Stake) public userStakes;
    uint256 public totalStaked;
    uint256 public lockPeriod = 365 days;
    uint256 public earlyUnstakePenaltyPercent = 5; // e.g., 5%

    // Tiered APY structure
    struct Tier {
        uint256 minAmount;
        uint256 apy; // e.g., 12 for 12%
    }
    Tier[] public stakingTiers;

    // Referral program
    mapping(address => address) public sponsors;
    uint256[] public referralBonuses; // Array of bonus percentages, e.g., [1000, 500, ...] for 10%, 5%
    uint256 public constant MAX_REFERRAL_LEVELS = 10;
    
    // --- Constructor ---

    /**
     * @param _tokenAddress The address of the EGLIFE BEP-20 token.
     * @param _initialOwner The address that will own the contract.
     */
    constructor(address _tokenAddress, address _initialOwner) Ownable(_initialOwner) {
        EGLIFE_TOKEN = IERC20(_tokenAddress);
        _initializeTiers();
        _initializeReferralBonuses();
    }

    // --- Internal Initializers ---

    function _initializeTiers() private {
        stakingTiers.push(Tier(10 * 1e18, 12));    // Starter
        stakingTiers.push(Tier(101 * 1e18, 18));   // Bronze
        stakingTiers.push(Tier(501 * 1e18, 20));   // Silver
        stakingTiers.push(Tier(1001 * 1e18, 22));  // Gold
        stakingTiers.push(Tier(5001 * 1e18, 24));  // Platinum
        stakingTiers.push(Tier(10001 * 1e18, 26)); // Diamond
    }

    function _initializeReferralBonuses() private {
        referralBonuses.push(1000); // Level 1: 10%
        referralBonuses.push(500);  // Level 2: 5%
        referralBonuses.push(300);  // Level 3: 3%
        referralBonuses.push(200);  // Level 4: 2%
        referralBonuses.push(100);  // Level 5: 1%
        referralBonuses.push(100);  // Level 6: 1%
        referralBonuses.push(50);   // Level 7: 0.5%
        referralBonuses.push(50);   // Level 8: 0.5%
        referralBonuses.push(25);   // Level 9: 0.25%
        referralBonuses.push(25);   // Level 10: 0.25%
    }

    // --- Core Staking Logic ---

    /**
     * @notice Stakes EGLIFE tokens. The user must approve this contract first.
     * @param _amount The amount of EGLIFE tokens to stake. Must be in wei (e.g., amount * 1e18).
     * @param _sponsor The wallet address of the user who referred the staker. Use address(0) if no sponsor.
     */
    function stake(uint256 _amount, address _sponsor) external nonReentrant {
        require(_amount > 0, "Stake amount must be greater than zero");
        require(userStakes[msg.sender].amount == 0, "User already has an active stake");
        require(getTierForAmount(_amount) != type(uint256).max, "Amount does not meet minimum stake");

        // Record the sponsor if it's a valid address and not the user themselves
        if (_sponsor != address(0) && _sponsor != msg.sender) {
            sponsors[msg.sender] = _sponsor;
        }

        // Handle referral bonuses
        _distributeReferralBonuses(msg.sender, _amount);

        // Perform the stake
        userStakes[msg.sender] = Stake({
            amount: _amount,
            startTime: block.timestamp,
            sponsor: sponsors[msg.sender]
        });
        totalStaked += _amount;

        emit Staked(msg.sender, _amount, sponsors[msg.sender]);

        // Transfer tokens from the user to this contract
        uint256 balanceBefore = EGLIFE_TOKEN.balanceOf(address(this));
        EGLIFE_TOKEN.transferFrom(msg.sender, address(this), _amount);
        require(EGLIFE_TOKEN.balanceOf(address(this)) >= balanceBefore + _amount, "Token transfer failed");
    }

    /**
     * @notice Unstakes the user's tokens and claims their rewards.
     * An early unstake penalty may apply.
     */
    function unstake() external nonReentrant {
        Stake storage userStake = userStakes[msg.sender];
        require(userStake.amount > 0, "No active stake found for user");

        uint256 stakedAmount = userStake.amount;
        uint256 reward = calculateReward(msg.sender);
        
        uint256 totalReturn = stakedAmount + reward;
        bool isEarly = (block.timestamp < userStake.startTime + lockPeriod);

        // Apply penalty if unstaking early
        if (isEarly) {
            uint256 penaltyAmount = (totalReturn * earlyUnstakePenaltyPercent) / 100;
            totalReturn -= penaltyAmount;
        }
        
        // Reset the user's stake
        delete userStakes[msg.sender];
        totalStaked -= stakedAmount;
        
        emit Unstaked(msg.sender, stakedAmount, reward);

        // Transfer principal and rewards (minus any penalty) to the user
        require(EGLIFE_TOKEN.balanceOf(address(this)) >= totalReturn, "Contract has insufficient balance");
        EGLIFE_TOKEN.transfer(msg.sender, totalReturn);
    }
    
    // --- Referral Logic ---

    /**
     * @dev Internal function to process and distribute referral bonuses.
     * @param _staker The address of the new user staking tokens.
     * @param _stakedAmount The amount of tokens the new user is staking.
     */
    function _distributeReferralBonuses(address _staker, uint256 _stakedAmount) private {
        address currentReferrer = sponsors[_staker];
        for (uint256 i = 0; i < MAX_REFERRAL_LEVELS; i++) {
            if (currentReferrer == address(0)) {
                break; // Stop if there's no higher-level sponsor
            }

            // To be eligible, a referrer must also have an active stake
            if (userStakes[currentReferrer].amount > 0) {
                uint256 bonusPercentage = referralBonuses[i];
                uint256 bonusAmount = (_stakedAmount * bonusPercentage) / 10000;
                
                if (bonusAmount > 0) {
                     EGLIFE_TOKEN.transfer(currentReferrer, bonusAmount);
                     emit ReferralBonusPaid(currentReferrer, _staker, i + 1, bonusAmount);
                }
            }

            // Move to the next level up in the referral chain
            currentReferrer = sponsors[currentReferrer];
        }
    }

    // --- View & Helper Functions ---

    /**
     * @notice Calculates the total reward a user has accrued.
     * @param _user The address of the user to check.
     * @return The total reward amount in EGLIFE (in wei).
     */
    function calculateReward(address _user) public view returns (uint256) {
        Stake storage userStake = userStakes[_user];
        if (userStake.amount == 0) {
            return 0;
        }

        uint256 apy = getAPYForAmount(userStake.amount);
        uint256 stakedDuration = block.timestamp - userStake.startTime;

        // Reward formula: (principal * APY * duration) / (100 * 365 days)
        return (userStake.amount * apy * stakedDuration) / (100 * 365 days);
    }
    
    /**
     * @notice Gets the APY for a given staking amount.
     * @param _amount The amount to check.
     * @return The APY percentage (e.g., 12 for 12%).
     */
    function getAPYForAmount(uint256 _amount) public view returns (uint256) {
        uint256 tierIndex = getTierForAmount(_amount);
        require(tierIndex != type(uint256).max, "Amount below minimum");
        return stakingTiers[tierIndex].apy;
    }

    /**
     * @dev Finds the correct tier index for a given staking amount.
     * @return The index of the tier, or type(uint256).max if not found.
     */
    function getTierForAmount(uint256 _amount) public view returns (uint256) {
        for (uint256 i = stakingTiers.length; i > 0; i--) {
            if (_amount >= stakingTiers[i - 1].minAmount) {
                return i - 1;
            }
        }
        return type(uint256).max; // Sentinel value for no tier found
    }

    // --- Admin Functions ---

    /**
     * @notice Updates the entire list of staking tiers.
     * @param _tiers The new array of Tier structs.
     */
    function setStakingTiers(Tier[] calldata _tiers) external onlyOwner {
        delete stakingTiers;
        for (uint i = 0; i < _tiers.length; i++) {
            stakingTiers.push(_tiers[i]);
        }
        emit TiersUpdated();
    }
    
    /**
     * @notice Updates the referral bonus percentages for all 10 levels.
     * @param _bonuses An array of 10 numbers representing the basis points (e.g., 1000 for 10%).
     */
    function setReferralBonuses(uint256[] calldata _bonuses) external onlyOwner {
        require(_bonuses.length == MAX_REFERRAL_LEVELS, "Bonuses must be for 10 levels");
        delete referralBonuses;
        for (uint i = 0; i < _bonuses.length; i++) {
            referralBonuses.push(_bonuses[i]);
        }
        emit ReferralBonusesUpdated();
    }

    /**
     * @notice Sets the staking lock period.
     * @param _newLockPeriod The new lock period in seconds.
     */
    function setLockPeriod(uint256 _newLockPeriod) external onlyOwner {
        lockPeriod = _newLockPeriod;
        emit LockPeriodUpdated(_newLockPeriod);
    }

    /**
     * @notice Sets the early unstake penalty percentage.
     * @param _newPenalty The new penalty percentage (e.g., 5 for 5%).
     */
    function setEarlyUnstakePenalty(uint256 _newPenalty) external onlyOwner {
        require(_newPenalty <= 100, "Penalty cannot exceed 100%");
        earlyUnstakePenaltyPercent = _newPenalty;
        emit EarlyUnstakePenaltyUpdated(_newPenalty);
    }
    
    /**
     * @notice Allows the owner to withdraw any EGLIFE tokens accidentally sent to the contract.
     * This is a safety measure and should not be used for staked funds.
     * @param _amount The amount to withdraw.
     */
    function emergencyWithdraw(uint256 _amount) external onlyOwner {
        uint256 withdrawableBalance = EGLIFE_TOKEN.balanceOf(address(this)) - totalStaked;
        require(_amount <= withdrawableBalance, "Cannot withdraw staked funds");
        EGLIFE_TOKEN.transfer(owner(), _amount);
    }
}
