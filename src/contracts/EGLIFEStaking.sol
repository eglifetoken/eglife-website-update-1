/**
 *Submitted for verification at BscScan.com on 2025-08-23
*/

// File: https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.0.2/contracts/token/ERC20/IERC20.sol


// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.20;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

// File: https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.0.2/contracts/token/ERC20/extensions/IERC20Permit.sol


// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/extensions/IERC20Permit.sol)

pragma solidity ^0.8.20;

/**
 * @dev Interface of the ERC20 Permit extension allowing approvals to be made via signatures, as defined in
 * https://eips.ethereum.org/EIPS/eip-2612[EIP-2612].
 *
 * Adds the {permit} method, which can be used to change an account's ERC20 allowance (see {IERC20-allowance}) by
 * presenting a message signed by the account. By not relying on {IERC20-approve}, the token holder account doesn't
 * need to send a transaction, and thus is not required to hold Ether at all.
 *
 * ==== Security Considerations
 *
 * There are two important considerations concerning the use of `permit`. The first is that a valid permit signature
 * expresses an allowance, and it should not be assumed to convey additional meaning. In particular, it should not be
 * considered as an intention to spend the allowance in any specific way. The second is that because permits have
 * built-in replay protection and can be submitted by anyone, they can be frontrun. A protocol that uses permits should
 * take this into consideration and allow a `permit` call to fail. Combining these two aspects, a pattern that may be
 * generally recommended is:
 *
 * ```solidity
 * function doThingWithPermit(..., uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) public {
 *     try token.permit(msg.sender, address(this), value, deadline, v, r, s) {} catch {}
 *     doThing(..., value);
 * }
 *
 * function doThing(..., uint256 value) public {
 *     token.safeTransferFrom(msg.sender, address(this), value);
 *     ...
 * }
 * ```
 *
 * Observe that: 1) `msg.sender` is used as the owner, leaving no ambiguity as to the signer intent, and 2) the use of
 * `try/catch` allows the permit to fail and makes the code tolerant to frontrunning. (See also
 * {SafeERC20-safeTransferFrom}).
 *
 * Additionally, note that smart contract wallets (such as Argent or Safe) are not able to produce permit signatures, so
 * contracts should have entry points that don't rely on permit.
 */
interface IERC20Permit {
    /**
     * @dev Sets `value` as the allowance of `spender` over ``owner``'s tokens,
     * given ``owner``'s signed approval.
     *
     * IMPORTANT: The same issues {IERC20-approve} has related to transaction
     * ordering also apply here.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `deadline` must be a timestamp in the future.
     * - `v`, `r` and `s` must be a valid `secp256k1` signature from `owner`
     * over the EIP712-formatted function arguments.
     * - the signature must use ``owner``'s current nonce (see {nonces}).
     *
     * For more information on the signature format, see the
     * https://eips.ethereum.org/EIPS/eip-2612#specification[relevant EIP
     * section].
     *
     * CAUTION: See Security Considerations above.
     */
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    /**
     * @dev Returns the current nonce for `owner`. This value must be
     * included whenever a signature is generated for {permit}.
     *
     * Every successful call to {permit} increases ``owner``'s nonce by one. This
     * prevents a signature from being used multiple times.
     */
    function nonces(address owner) external view returns (uint256);

    /**
     * @dev Returns the domain separator used in the encoding of the signature for {permit}, as defined by {EIP712}.
     */
    // solhint-disable-next-line func-name-mixedcase
    function DOMAIN_SEPARATOR() external view returns (bytes32);
}

// File: https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.0.2/contracts/utils/Address.sol


// OpenZeppelin Contracts (last updated v5.0.0) (utils/Address.sol)

pragma solidity ^0.8.20;

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev The ETH balance of the account is not enough to perform the operation.
     */
    error AddressInsufficientBalance(address account);

    /**
     * @dev There's no code at `target` (it is not a contract).
     */
    error AddressEmptyCode(address target);

    /**
     * @dev A call to an address target failed. The target may have reverted.
     */
    error FailedInnerCall();

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.8.20/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        if (address(this).balance < amount) {
            revert AddressInsufficientBalance(address(this));
        }

        (bool success, ) = recipient.call{value: amount}("");
        if (!success) {
            revert FailedInnerCall();
        }
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain `call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason or custom error, it is bubbled
     * up by this function (like regular Solidity function calls). However, if
     * the call reverted with no returned reason, this function reverts with a
     * {FailedInnerCall} error.
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
        if (address(this).balance < value) {
            revert AddressInsufficientBalance(address(this));
        }
        (bool success, bytes memory returndata) = target.call{value: value}(data);
        return verifyCallResultFromTarget(target, success, returndata);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     */
    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        (bool success, bytes memory returndata) = target.staticcall(data);
        return verifyCallResultFromTarget(target, success, returndata);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a delegate call.
     */
    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return verifyCallResultFromTarget(target, success, returndata);
    }

    /**
     * @dev Tool to verify that a low level call to smart-contract was successful, and reverts if the target
     * was not a contract or bubbling up the revert reason (falling back to {FailedInnerCall}) in case of an
     * unsuccessful call.
     */
    function verifyCallResultFromTarget(
        address target,
        bool success,
        bytes memory returndata
    ) internal view returns (bytes memory) {
        if (!success) {
            _revert(returndata);
        } else {
            // only check if target is a contract if the call was successful and the return data is empty
            // otherwise we already know that it was a contract
            if (returndata.length == 0 && target.code.length == 0) {
                revert AddressEmptyCode(target);
            }
            return returndata;
        }
    }

    /**
     * @dev Tool to verify that a low level call was successful, and reverts if it wasn't, either by bubbling the
     * revert reason or with a default {FailedInnerCall} error.
     */
    function verifyCallResult(bool success, bytes memory returndata) internal pure returns (bytes memory) {
        if (!success) {
            _revert(returndata);
        } else {
            return returndata;
        }
    }

    /**
     * @dev Reverts with returndata if present. Otherwise reverts with {FailedInnerCall}.
     */
    function _revert(bytes memory returndata) private pure {
        // Look for revert reason and bubble it up if present
        if (returndata.length > 0) {
            // The easiest way to bubble the revert reason is using memory via assembly
            /// @solidity memory-safe-assembly
            assembly {
                let returndata_size := mload(returndata)
                revert(add(32, returndata), returndata_size)
            }
        } else {
            revert FailedInnerCall();
        }
    }
}

// File: https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.0.2/contracts/token/ERC20/utils/SafeERC20.sol


// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/utils/SafeERC20.sol)

pragma solidity ^0.8.20;




/**
 * @title SafeERC20
 * @dev Wrappers around ERC20 operations that throw on failure (when the token
 * contract returns false). Tokens that return no value (and instead revert or
 * throw on failure) are also supported, non-reverting calls are assumed to be
 * successful.
 * To use this library you can add a `using SafeERC20 for IERC20;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 */
library SafeERC20 {
    using Address for address;

    /**
     * @dev An operation with an ERC20 token failed.
     */
    error SafeERC20FailedOperation(address token);

    /**
     * @dev Indicates a failed `decreaseAllowance` request.
     */
    error SafeERC20FailedDecreaseAllowance(address spender, uint256 currentAllowance, uint256 requestedDecrease);

    /**
     * @dev Transfer `value` amount of `token` from the calling contract to `to`. If `token` returns no value,
     * non-reverting calls are assumed to be successful.
     */
    function safeTransfer(IERC20 token, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeCall(token.transfer, (to, value)));
    }

    /**
     * @dev Transfer `value` amount of `token` from `from` to `to`, spending the approval given by `from` to the
     * calling contract. If `token` returns no value, non-reverting calls are assumed to be successful.
     */
    function safeTransferFrom(IERC20 token, address from, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeCall(token.transferFrom, (from, to, value)));
    }

    /**
     * @dev Increase the calling contract's allowance toward `spender` by `value`. If `token` returns no value,
     * non-reverting calls are assumed to be successful.
     */
    function safeIncreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        uint256 oldAllowance = token.allowance(address(this), spender);
        forceApprove(token, spender, oldAllowance + value);
    }

    /**
     * @dev Decrease the calling contract's allowance toward `spender` by `requestedDecrease`. If `token` returns no
     * value, non-reverting calls are assumed to be successful.
     */
    function safeDecreaseAllowance(IERC20 token, address spender, uint256 requestedDecrease) internal {
        unchecked {
            uint256 currentAllowance = token.allowance(address(this), spender);
            if (currentAllowance < requestedDecrease) {
                revert SafeERC20FailedDecreaseAllowance(spender, currentAllowance, requestedDecrease);
            }
            forceApprove(token, spender, currentAllowance - requestedDecrease);
        }
    }

    /**
     * @dev Set the calling contract's allowance toward `spender` to `value`. If `token` returns no value,
     * non-reverting calls are assumed to be successful. Meant to be used with tokens that require the approval
     * to be set to zero before setting it to a non-zero value, such as USDT.
     */
    function forceApprove(IERC20 token, address spender, uint256 value) internal {
        bytes memory approvalCall = abi.encodeCall(token.approve, (spender, value));

        if (!_callOptionalReturnBool(token, approvalCall)) {
            _callOptionalReturn(token, abi.encodeCall(token.approve, (spender, 0)));
            _callOptionalReturn(token, approvalCall);
        }
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     */
    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves. We use {Address-functionCall} to perform this call, which verifies that
        // the target address contains contract code and also asserts for success in the low-level call.

        bytes memory returndata = address(token).functionCall(data);
        if (returndata.length != 0 && !abi.decode(returndata, (bool))) {
            revert SafeERC20FailedOperation(address(token));
        }
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     *
     * This is a variant of {_callOptionalReturn} that silents catches all reverts and returns a bool instead.
     */
    function _callOptionalReturnBool(IERC20 token, bytes memory data) private returns (bool) {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves. We cannot use {Address-functionCall} here since this should return false
        // and not revert is the subcall reverts.

        (bool success, bytes memory returndata) = address(token).call(data);
        return success && (returndata.length == 0 || abi.decode(returndata, (bool))) && address(token).code.length > 0;
    }
}

// File: https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.0.2/contracts/utils/Context.sol


// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)

pragma solidity ^0.8.20;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}

// File: https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.0.2/contracts/access/Ownable.sol


// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)

pragma solidity ^0.8.20;


/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * The initial owner is set to the address provided by the deployer. This can
 * later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    /**
     * @dev The caller account is not authorized to perform an operation.
     */
    error OwnableUnauthorizedAccount(address account);

    /**
     * @dev The owner is not a valid owner account. (eg. `address(0)`)
     */
    error OwnableInvalidOwner(address owner);

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// File: https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.0.2/contracts/utils/ReentrancyGuard.sol


// OpenZeppelin Contracts (last updated v5.0.0) (utils/ReentrancyGuard.sol)

pragma solidity ^0.8.20;

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant NOT_ENTERED = 1;
    uint256 private constant ENTERED = 2;

    uint256 private _status;

    /**
     * @dev Unauthorized reentrant call.
     */
    error ReentrancyGuardReentrantCall();

    constructor() {
        _status = NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be NOT_ENTERED
        if (_status == ENTERED) {
            revert ReentrancyGuardReentrantCall();
        }

        // Any calls to nonReentrant after this point will fail
        _status = ENTERED;
    }

    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = NOT_ENTERED;
    }

    /**
     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
     * `nonReentrant` function in the call stack.
     */
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == ENTERED;
    }
}

// File: https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.0.2/contracts/utils/Pausable.sol


// OpenZeppelin Contracts (last updated v5.0.0) (utils/Pausable.sol)

pragma solidity ^0.8.20;


/**
 * @dev Contract module which allows children to implement an emergency stop
 * mechanism that can be triggered by an authorized account.
 *
 * This module is used through inheritance. It will make available the
 * modifiers `whenNotPaused` and `whenPaused`, which can be applied to
 * the functions of your contract. Note that they will not be pausable by
 * simply including this module, only once the modifiers are put in place.
 */
abstract contract Pausable is Context {
    bool private _paused;

    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    /**
     * @dev The operation failed because the contract is paused.
     */
    error EnforcedPause();

    /**
     * @dev The operation failed because the contract is not paused.
     */
    error ExpectedPause();

    /**
     * @dev Initializes the contract in unpaused state.
     */
    constructor() {
        _paused = false;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    modifier whenNotPaused() {
        _requireNotPaused();
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    modifier whenPaused() {
        _requirePaused();
        _;
    }

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() public view virtual returns (bool) {
        return _paused;
    }

    /**
     * @dev Throws if the contract is paused.
     */
    function _requireNotPaused() internal view virtual {
        if (paused()) {
            revert EnforcedPause();
        }
    }

    /**
     * @dev Throws if the contract is not paused.
     */
    function _requirePaused() internal view virtual {
        if (!paused()) {
            revert ExpectedPause();
        }
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(_msgSender());
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(_msgSender());
    }
}

// File: eglifestaking_remix/EGLIFEStaking_complete.sol


pragma solidity ^0.8.20;

// --- OpenZeppelin v5.0.2 (correct paths for Remix) ---






/**
 * @title EGLIFEStaking
 * @notice Single-token staking with tiered APY, lock/penalty, and multi-level referral payouts.
 * @dev Rewards are paid from the contract's token balance (must be funded).
 *      Referral bonuses are paid instantly out of each deposit; the user's net stake is deposit minus referral payouts.
 */
contract EGLIFEStaking is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    // ---------------- Constants & Types ----------------
    uint16 public constant BPS_DENOMINATOR = 10_000; // 100.00%
    uint256 private constant YEAR = 365 days;

    struct StakeInfo {
        uint256 principal;      // active staked principal
        uint128 lastClaim;      // last timestamp rewards were checkpointed
        uint128 accRewards;     // rewards accrued but not yet claimed
    }

    // ---------------- Immutable ----------------
    IERC20 public immutable token;

    // ---------------- Staking State ----------------
    mapping(address => StakeInfo) public stakes;
    mapping(address => uint256) public stakedOf;
    uint256 public totalStaked;

    // Lock/penalty
    uint256 public lockPeriod = 30 days;
    uint16  public earlyUnstakePenaltyBps = 0; // e.g., 500 = 5%
    address public treasury; // optional receiver for penalty; if zero, penalty stays in contract

    // ---------------- Referral State ----------------
    // direct upline (Level 1) for each user; set once on first stake (if provided)
    mapping(address => address) public sponsors;

    // Level 1..10 bonuses (in BPS). Defaults: 10%,5%,3%,2%,1%,1%,0.5%,0.5%,0.25%,0.25%
    uint16[10] public REF_BONUS_BPS = [uint16(1000), 500, 300, 200, 100, 100, 50, 50, 25, 25];

    // Royalty beyond level 10 (per level), default 0.10%
    uint16 public royaltyBps = 10; // 0.10%

    // Eligibility: minimum active stake required for a referrer to earn bonuses
    uint256 public minActiveStakeForReferral = 1e18; // default = 1 token (18 decimals)

    // Safety cap: maximum total referral payout per deposit (in BPS of deposit)
    uint16 public maxReferralPayoutBps = 3000; // default 30%

    // ---------------- Tiered APY ----------------
    // APY is chosen based on current principal using the highest tier whose minAmount <= principal
    uint128[] public tierMinAmount; // ascending
    uint16[]  public tierApyBps;    // same length as tierMinAmount

    // ---------------- Events ----------------
    event Staked(address indexed user, uint256 grossAmount, uint256 netStaked, address indexed sponsor);
    event Unstaked(address indexed user, uint256 unstakeAmount, uint256 penalty, uint256 rewardsPaid);
    event Claimed(address indexed user, uint256 rewardsPaid);

    event ReferralBonusPaid(address indexed referrer, address indexed referral, uint256 level, uint256 bonusAmount);
    event SponsorSet(address indexed user, address indexed sponsor);

    event ReferralBonusesUpdated(uint16[10] levelsBps);
    event RoyaltyUpdated(uint16 royaltyBps);
    event MinActiveStakeForReferralUpdated(uint256 minStake);
    event MaxReferralPayoutUpdated(uint16 maxPayoutBps);

    event LockPeriodUpdated(uint256 newLockPeriod);
    event EarlyUnstakePenaltyUpdated(uint16 newPenaltyBps);
    event TreasuryUpdated(address treasury);

    event TiersUpdated(uint128[] minAmounts, uint16[] apyBps);

    // ---------------- Constructor ----------------
    constructor(IERC20 _token, address initialOwner, address _treasury) Ownable(initialOwner) {
        require(address(_token) != address(0), "token=0");
        token = _token;
        treasury = _treasury;

        // Default single tier: 12% APY for any amount
        tierMinAmount.push(0);
        tierApyBps.push(1200);
    }

    // ---------------- Modifiers / Internal helpers ----------------
    function _maybeSetSponsor(address user, address sponsor_) internal {
        if (user == sponsor_ || sponsor_ == address(0)) return;
        if (sponsors[user] == address(0)) {
            sponsors[user] = sponsor_;
            emit SponsorSet(user, sponsor_);
        }
    }

    function _isActiveForReferral(address user) internal view returns (bool) {
        return stakedOf[user] >= minActiveStakeForReferral;
    }

    function _getApyBps(uint256 amount) internal view returns (uint16 apy) {
        // choose highest tier with minAmount <= amount
        uint256 len = tierMinAmount.length;
        if (len == 0) return 0;
        apy = tierApyBps[0];
        for (uint256 i = 1; i < len; i++) {
            if (amount >= tierMinAmount[i]) {
                apy = tierApyBps[i];
            } else {
                break;
            }
        }
    }

    function _accruedSince(address user) internal view returns (uint256) {
        StakeInfo memory s = stakes[user];
        if (s.principal == 0 || s.lastClaim == 0) return 0;
        uint256 elapsed = block.timestamp - uint256(s.lastClaim);
        if (elapsed == 0) return 0;
        uint16 apy = _getApyBps(s.principal);
        // linear accrual: principal * apyBps * elapsed / YEAR / BPS_DENOMINATOR
        return (s.principal * uint256(apy) * elapsed) / YEAR / BPSDENOM();
    }

    // Tiny helper to keep stack depth low for constant
    function BPSDENOM() private pure returns (uint256) { return uint256(BPS_DENOMINATOR); }

    // ---------------- Owner Admin ----------------
    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function setTreasury(address _treasury) external onlyOwner {
        treasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }

    function setLockPeriod(uint256 newLock) external onlyOwner {
        require(newLock <= 365 days, "lock too long");
        lockPeriod = newLock;
        emit LockPeriodUpdated(newLock);
    }

    function setEarlyUnstakePenaltyBps(uint16 bps) external onlyOwner {
        require(bps <= 2_000, "penalty >20%");
        earlyUnstakePenaltyBps = bps;
        emit EarlyUnstakePenaltyUpdated(bps);
    }

    // ---- Referral config ----
    function setReferralBonuses(uint16[10] calldata levelsBps) external onlyOwner {
        for (uint256 i = 0; i < 10; i++) {
            require(levelsBps[i] <= BPS_DENOMINATOR, "level bps too high");
            REF_BONUS_BPS[i] = levelsBps[i];
        }
        emit ReferralBonusesUpdated(REF_BONUS_BPS);
    }

    function setReferralBonusForLevel(uint256 level, uint16 bps) external onlyOwner {
        require(level >= 1 && level <= 10, "level 1..10");
        require(bps <= BPS_DENOMINATOR, "bps too high");
        REF_BONUS_BPS[level - 1] = bps;
        emit ReferralBonusesUpdated(REF_BONUS_BPS);
    }

    function setRoyaltyBps(uint16 _royaltyBps) external onlyOwner {
        require(_royaltyBps <= 500, "royalty >5% not allowed");
        royaltyBps = _royaltyBps;
        emit RoyaltyUpdated(_royaltyBps);
    }

    function setMinActiveStakeForReferral(uint256 _min) external onlyOwner {
        minActiveStakeForReferral = _min;
        emit MinActiveStakeForReferralUpdated(_min);
    }

    function setMaxReferralPayoutBps(uint16 _max) external onlyOwner {
        require(_max <= BPS_DENOMINATOR, "invalid max");
        maxReferralPayoutBps = _max;
        emit MaxReferralPayoutUpdated(_max);
    }

    // ---- Tiered APY ----
    function setTiers(uint128[] calldata minAmounts, uint16[] calldata apyBps) external onlyOwner {
        require(minAmounts.length == apyBps.length && minAmounts.length > 0, "len mismatch");
        // ensure ascending
        for (uint256 i = 1; i < minAmounts.length; i++) {
            require(minAmounts[i] > minAmounts[i-1], "min ascending");
            require(apyBps[i] <= BPS_DENOMINATOR, "apy too high");
        }
        // replace arrays
        delete tierMinAmount;
        delete tierApyBps;
        for (uint256 i = 0; i < minAmounts.length; i++) {
            tierMinAmount.push(minAmounts[i]);
            tierApyBps.push(apyBps[i]);
        }
        emit TiersUpdated(minAmounts, apyBps);
    }

    // ---------------- Referral Payouts ----------------
    /**
     * @dev Pays referral bonuses instantly out of the just-received deposit.
     *      Returns totalPaid so caller can compute net stake.
     *      Applies maxReferralPayoutBps cap across all levels (including royalty).
     */
    function _payReferralBonuses(address staker, uint256 amount) internal returns (uint256 totalPaid) {
        if (amount == 0 || maxReferralPayoutBps == 0) return 0;

        uint256 cap = (amount * maxReferralPayoutBps) / BPS_DENOMINATOR;
        address upline = sponsors[staker];

        // Levels 1..10
        for (uint256 level = 0; level < 10 && upline != address(0) && totalPaid < cap; level++) {
            if (_isActiveForReferral(upline)) {
                uint256 bonus = (amount * REF_BONUS_BPS[level]) / BPS_DENOMINATOR;
                uint256 remaining = cap - totalPaid;
                if (bonus > remaining) bonus = remaining;

                if (bonus > 0) {
                    token.safeTransfer(upline, bonus);
                    totalPaid += bonus;
                    emit ReferralBonusPaid(upline, staker, level + 1, bonus);
                }
            }
            upline = sponsors[upline];
        }

        // Royalty beyond level 10 (tagged as level=11 in events)
        while (upline != address(0) && totalPaid < cap) {
            if (_isActiveForReferral(upline)) {
                uint256 bonus = (amount * royaltyBps) / BPS_DENOMINATOR;
                uint256 remaining = cap - totalPaid;
                if (bonus > remaining) bonus = remaining;

                if (bonus > 0) {
                    token.safeTransfer(upline, bonus);
                    totalPaid += bonus;
                    emit ReferralBonusPaid(upline, staker, 11, bonus);
                }
            }
            upline = sponsors[upline];
        }
    }

    // ---------------- User Actions ----------------
    /**
     * @notice Stake tokens. Referral sponsor can be set on first stake only.
     * @param amount Amount of tokens to stake (must be approved first).
     * @param sponsor Address of your sponsor (optional; ignored if already set).
     */
    function stake(uint256 amount, address sponsor) external nonReentrant whenNotPaused {
        require(amount > 0, "amount=0");

        // Pull full amount in first (contract will use part of it to pay referrals)
        token.safeTransferFrom(msg.sender, address(this), amount);

        // Set sponsor once (if provided)
        _maybeSetSponsor(msg.sender, sponsor);

        // Pay referrals out of deposit; user stakes net amount
        uint256 referralPaid = _payReferralBonuses(msg.sender, amount);
        uint256 netAmount = amount - referralPaid;
        require(netAmount > 0, "net stake=0");

        // Accrue rewards to date, then bump principal & checkpoint
        StakeInfo storage s = stakes[msg.sender];
        uint256 addAcc = _accruedSince(msg.sender);
        if (addAcc > 0) s.accRewards += uint128(addAcc);
        s.lastClaim = uint128(block.timestamp);

        s.principal += netAmount;
        stakedOf[msg.sender] += netAmount;
        totalStaked += netAmount;

        emit Staked(msg.sender, amount, netAmount, sponsors[msg.sender]);
    }

    /**
     * @notice Claim accrued rewards.
     */
    function claim() external nonReentrant whenNotPaused {
        StakeInfo storage s = stakes[msg.sender];
        uint256 pending = _accruedSince(msg.sender) + uint256(s.accRewards);
        require(pending > 0, "no rewards");
        s.accRewards = 0;
        s.lastClaim = uint128(block.timestamp);

        token.safeTransfer(msg.sender, pending);
        emit Claimed(msg.sender, pending);
    }

    /**
     * @notice Unstake part or all of your principal. Automatically pays accrued rewards.
     * @param amount Amount of principal to withdraw.
     */
    function unstake(uint256 amount) external nonReentrant whenNotPaused {
        StakeInfo storage s = stakes[msg.sender];
        require(amount > 0 && amount <= s.principal, "bad amount");

        // Accrue rewards to date
        uint256 accrued = _accruedSince(msg.sender);
        if (accrued > 0) s.accRewards += uint128(accrued);
        s.lastClaim = uint128(block.timestamp);

        // Compute penalty if within lock
        uint256 penalty = 0;
        if (earlyUnstakePenaltyBps > 0) {
            // If ANY part of the user's current stake is still in lock, apply penalty on the requested amount.
            // Simple policy: lock based on time since last claim/first stake event.
            bool inLock = (block.timestamp < uint256(s.lastClaim) + lockPeriod);
            if (inLock) {
                penalty = (amount * earlyUnstakePenaltyBps) / BPS_DENOMINATOR;
            }
        }

        // Update principal & totals
        s.principal -= amount;
        stakedOf[msg.sender] -= amount;
        totalStaked -= amount;

        // Payouts: principal - penalty + rewards
        uint256 principalOut = amount - penalty;
        uint256 rewardsOut = uint256(s.accRewards);
        s.accRewards = 0;

        // send penalty to treasury if set; otherwise it remains in contract (increasing reward liquidity)
        if (penalty > 0 && treasury != address(0)) {
            token.safeTransfer(treasury, penalty);
        }

        if (principalOut > 0) token.safeTransfer(msg.sender, principalOut);
        if (rewardsOut > 0)   token.safeTransfer(msg.sender, rewardsOut);

        emit Unstaked(msg.sender, amount, penalty, rewardsOut);
    }

    // ---------------- Views & Utilities ----------------
    function earned(address user) external view returns (uint256) {
        StakeInfo memory s = stakes[user];
        return _accruedSince(user) + uint256(s.accRewards);
    }

    function getTierCount() external view returns (uint256) {
        return tierMinAmount.length;
    }



    function getTiers() external view returns (uint128[] memory mins, uint16[] memory apys) {
        mins = tierMinAmount;
        apys = tierApyBps;
    }

    // ---------------- Owner Rescue ----------------
    function recoverERC20(address erc20, uint256 amount, address to) external onlyOwner {
        require(to != address(0), "to=0");
        IERC20(erc20).safeTransfer(to, amount);
    }
}
