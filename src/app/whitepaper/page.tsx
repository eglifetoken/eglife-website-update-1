
export default function WhitepaperPage() {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <article className="prose prose-lg max-w-4xl mx-auto dark:prose-invert prose-h1:font-headline prose-h2:font-headline prose-h3:font-headline prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EGLIFE Token Whitepaper</h1>
          <p className="text-lg text-muted-foreground">Version 1.0 - Last Updated: August 2025</p>
          <p><strong>Website:</strong> <a href="https://eglifetoken.xyz" target="_blank" rel="noopener noreferrer">https://eglifetoken.xyz</a></p>
          <p><strong>Contact Email:</strong> <a href="mailto:eglifetoken@gmail.com">eglifetoken@gmail.com</a></p>
  
          <section>
            <h2><strong>1. Executive Summary</strong></h2>
            <p>
              EGLIFE Token is a <strong>decentralized BEP-20 cryptocurrency</strong> deployed on the BNB Smart Chain. It aims to address core limitations in financial inclusivity and real-world crypto use-cases through a <strong>fully on-chain token economy</strong>.
            </p>
            <p>
              By integrating taxation, staking, and utility payments, EGLIFE creates a stable environment for sustainable growth and long-term value creation. Its flagship use-case, the <strong>EGPAY ecosystem</strong>, allows users to make payments, recharge utilities, and earn staking rewards using EGLIFE tokens.
            </p>
          </section>

          <section>
            <h2><strong>2. Problem Statement</strong></h2>
            <p>
              The digital currency landscape is saturated with projects that, while innovative, often fail to deliver tangible value or long-term sustainability. The majority of token projects suffer from a combination of poor utility, weak tokenomics, and a lack of genuine community incentives. Common problems include:
            </p>
            <ul>
                <li>
                    <strong>Absence of Reward Mechanisms:</strong> Many tokens do not offer compelling reasons for holders to maintain their positions long-term. Without staking rewards, profit-sharing, or other incentives, tokens are often dumped at the first sign of market volatility, leading to price instability.
                </li>
                <li>
                    <strong>High Token Inflation Without Supply Control:</strong> Projects often mint excessive tokens for rewards or operational costs without a counteracting deflationary mechanism. This leads to high inflation, which devalues the token over time and erodes holder confidence and purchasing power.
                </li>
                <li>
                    <strong>Lack of Real-World Utility:</strong> A significant number of cryptocurrencies exist purely as speculative assets. They have no integration with daily life utilities or commerce, which limits their adoption to a niche audience of traders and investors, rather than the general public.
                </li>
                <li>
                    <strong>Unfair Token Allocations:</strong> Many projects allocate a disproportionately large share of tokens to the team and private investors, with short vesting periods. This often leads to "pump and dump" schemes where insiders exit at the expense of the community and early public adopters, damaging trust and long-term viability.
                </li>
            </ul>
            <p>
              EGLIFE solves these critical issues through a carefully designed ecosystem featuring reward-based staking, referral airdrops to incentivize community growth, a controlled supply with burn mechanisms, and tangible, real-world utility through token-based transactions.
            </p>
          </section>
  
          <section>
            <h2><strong>3. Vision & Mission</strong></h2>
            <h3><strong>Vision:</strong></h3>
            <p>
              Empower every generation with easy-to-use decentralized financial solutions backed by blockchain.
            </p>
            <h3><strong>Mission:</strong></h3>
            <ul>
              <li>Provide real utility and day-to-day usage with EGLIFE Token.</li>
              <li>Encourage mass adoption with zero-barrier participation.</li>
              <li>Deliver transparency and decentralization via smart contract.</li>
              <li>Enable earning, saving, and spending within the same ecosystem.</li>
            </ul>
          </section>

          <section>
            <h2><strong>4. Token Utility & Ecosystem</strong></h2>
            <p>EGLIFE Token will serve as the backbone of multiple applications:</p>
            <ol>
              <li><strong>Utility Payments:</strong> Recharge mobile, pay electricity, water, or gas bills using EGLIFE.</li>
              <li><strong>Airdrop Campaigns:</strong> Distribute EGLIFE to early adopters and incentivize growth.</li>
              <li><strong>Referral System:</strong> Encourage users to invite others and earn a 10% bonus.</li>
              <li><strong>On-Chain Staking:</strong> Stake EGLIFE tokens and receive rewards after lock-in.</li>
              <li><strong>Token Burn:</strong> Users can burn EGLIFE voluntarily, reducing overall supply and increasing value.</li>
              <li><strong>Merchant Acceptance (Phase 2):</strong> EGLIFE aims to integrate with real-world POS systems.</li>
            </ol>
          </section>

          <section>
            <h2><strong>5. Technology Overview</strong></h2>
            <ul>
                <li><strong>Blockchain:</strong> Binance Smart Chain (BNB Chain)</li>
                <li><strong>Smart Contract Language:</strong> Solidity 0.8.20</li>
                <li><strong>Library:</strong> OpenZeppelin v4.9.0 (Audit-grade)</li>
                <li><strong>Standard:</strong> BEP-20 (compatible with ERC-20)</li>
                <li><strong>Verification:</strong> Fully verified on BscScan with source code</li>
                <li><strong>Deployment Address:</strong> 0xca326a5e15b9451efC1A6BddaD6fB098a4D09113</li>
            </ul>
          </section>
  
          <section>
            <h2><strong>6. Smart Contract Design</strong></h2>
             <p>The EGLIFE smart contract includes the following core modules:</p>
            <ul>
              <li><strong>ERC20 Compliance:</strong> Uses OpenZeppelin standard.</li>
              <li><strong>Tax Fee:</strong> Up to 10% fee configurable by the owner, default set to 2%.</li>
              <li><strong>Burn:</strong> Any user can burn their tokens, reducing total supply.</li>
              <li><strong>Airdrop:</strong> Owner can airdrop tokens to multiple addresses.</li>
              <li><strong>Stake/Unstake Logic:</strong> Lock tokens and earn 5% reward post 30 days.</li>
              <li><strong>Access Control:</strong> Only owner can change tax wallet, update tax, airdrop.</li>
            </ul>
          </section>

          <section>
            <h2><strong>7. Staking Mechanism</strong></h2>
            <p>EGLIFE introduces a simple yet powerful staking system:</p>
            <ul>
                <li><strong>Minimum Lock Period:</strong> 30 days</li>
                <li><strong>Stake Function:</strong> Users call <code>stake(amount)</code> to lock tokens</li>
                <li><strong>Reward:</strong> 5% of staked amount is minted as reward on withdrawal</li>
                <li><strong>Unstake Function:</strong> After 30 days, users call <code>unstake()</code> to receive principal + reward</li>
                <li>Staking is <strong>trustless, on-chain, and does not require manual approval.</strong></li>
            </ul>
          </section>
          
          <section>
              <h2><strong>8. Airdrop & Referral System</strong></h2>
              <h3><strong>Airdrop:</strong></h3>
              <p>Owner distributes a fixed number of EGLIFE tokens to selected addresses. This promotes awareness and adoption.</p>
              <h3><strong>Referral:</strong></h3>
              <ul>
                  <li>Every airdrop participant gets a referral code (Google Form backend)</li>
                  <li>On valid referral, the referrer receives a <strong>10% bonus</strong></li>
                  <li>System tracks wallet addresses and referrer mappings using Google Sheets or Firebase</li>
              </ul>
          </section>

          <section>
            <h2><strong>9. Tokenomics</strong></h2>
            <h3><strong>Token Distribution:</strong></h3>
            <ul>
              <li><strong>Public Airdrop:</strong> 10% (100,000,000)</li>
              <li><strong>Staking Rewards:</strong> 20% (200,000,000)</li>
              <li><strong>Ecosystem Growth:</strong> 30% (300,000,000)</li>
              <li><strong>Liquidity Pool:</strong> 20% (200,000,000)</li>
              <li><strong>Team & Advisors:</strong> 10% (100,000,000)</li>
              <li><strong>Burn & Reserve:</strong> 10% (100,000,000)</li>
            </ul>
            <p><strong>Total Supply:</strong> 1,000,000,000 EGLIFE (minted once at deployment)</p>
          </section>
  
          <section>
            <h2><strong>10. Roadmap</strong></h2>
            <ul>
                <li><strong>Phase 1 (Q2 2025):</strong> Contract Deployment, Testing, Website Live</li>
                <li><strong>Phase 2 (Q3 2025):</strong> Airdrop & Referral Campaign, Whitepaper Release</li>
                <li><strong>Phase 3 (Q4 2025):</strong> PancakeSwap Liquidity Launch, DEX Listing, Staking Live</li>
                <li><strong>Phase 4 (Q1 2026):</strong> EGPAY App Beta, Utility API Integrations</li>
                <li><strong>Phase 5 (Q2 2026):</strong> CoinGecko & CMC Listing, Smart Contract Audit</li>
                <li><strong>Phase 6 (Q3 2026):</strong> Launch EGPAY v1, Support for POS & Merchant Gateway</li>
            </ul>
          </section>
  
          <section>
            <h2><strong>11. Legal & Regulatory Compliance</strong></h2>
            <ul>
                <li>EGLIFE Token is <strong>not a security or financial instrument.</strong></li>
                <li>It is a <strong>utility token</strong> built for use within EGLIFE and EGPAY ecosystem.</li>
                <li>Project adheres to KYC/AML guidelines where applicable.</li>
                <li>Complies with open-source and transparency principles.</li>
            </ul>
          </section>

          <section>
            <h2><strong>12. Team</strong></h2>
            <ul>
                <li><strong>Project Lead:</strong> To be announced</li>
                <li><strong>Legal Advisor:</strong> To be announced</li>
                <li><strong>Developers:</strong> Anonymous Solidity Contributors (OpenZeppelin based)</li>
                <li><strong>Advisors:</strong> To be announced</li>
                <li><strong>Community Support:</strong> EGLIFE Volunteers across India</li>
            </ul>
          </section>

          <section>
              <h2><strong>13. Risk Factors</strong></h2>
              <ul>
                  <li><strong>Crypto Market Volatility:</strong> Token prices may fluctuate.</li>
                  <li><strong>Regulatory Shifts:</strong> Government laws may impact operations.</li>
                  <li><strong>Technical Errors:</strong> Bugs, contract failures, etc.</li>
                  <li><strong>Security Attacks:</strong> Smart contract hacks (audit pending)</li>
                  <li><strong>Adoption Delays:</strong> Utility partnerships may take time</li>
              </ul>
          </section>

          <section>
              <h2><strong>14. Conclusion</strong></h2>
              <p>
                EGLIFE bridges the gap between speculative tokens and real-life crypto applications. With a clear roadmap, staking incentives, and the EGPAY ecosystem, EGLIFE Token offers a sustainable, inclusive, and user-friendly experience for crypto adoption in India and beyond.
              </p>
          </section>

          <section>
              <h2><strong>15. Annexures</strong></h2>
              <ul>
                  <li><strong>Smart Contract:</strong> Verified on BscScan</li>
                  <li><strong>ABI & Bytecode:</strong> Available</li>
                  <li><strong>Audit:</strong> Scheduled (Q1 2026)</li>
                  <li><strong>Website:</strong> eglifetoken.xyz</li>
                  <li><strong>Whitepaper Format:</strong> DOCX, PDF, PPT (available on request)</li>
              </ul>
          </section>
        </article>
      </div>
    );
  }
