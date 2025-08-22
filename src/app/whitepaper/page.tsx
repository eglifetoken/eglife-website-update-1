
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
    ScrollText, 
    AlertTriangle, 
    Eye, 
    Rocket, 
    CheckCircle, 
    Users, 
    ShieldCheck, 
    Cpu, 
    FileJson, 
    GitCommit,
    GanttChartSquare,
    BookOpen,
    Scale,
    Users2,
    TriangleAlert,
    FileText,
    Target,
    Lightbulb,
    Network
} from "lucide-react";

const SectionCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <Card className="w-full">
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
             <div className="p-3 bg-primary/10 rounded-md w-fit">
                {icon}
            </div>
            <div className="flex-1">
                <CardTitle className="font-headline text-2xl">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

export default function WhitepaperPage() {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">EGLIFE Token Whitepaper</h1>
            <p className="text-lg text-foreground/80 mt-2">Version 1.0 - Last Updated: August 2025</p>
        </div>

        <div className="space-y-12">

            <SectionCard icon={<ScrollText className="h-8 w-8 text-primary" />} title="1. Executive Summary">
                <p className="text-foreground/80 leading-relaxed">
                    The EGLIFE Token is a decentralized BEP-20 cryptocurrency thoughtfully deployed on the robust and efficient BNB Smart Chain. It has been conceived to directly address the core limitations that hinder the widespread adoption of digital currencies: a lack of financial inclusivity for underserved populations and a scarcity of genuine, real-world crypto use-cases. By establishing a fully on-chain token economy, EGLIFE is building a transparent and self-sustaining financial ecosystem that operates beyond the confines of traditional banking. Our strategic approach integrates key pillars like fair taxation for development, on-chain staking for holder rewards, and most critically, the EGLIFE ecosystem—a platform for seamless utility payments and daily transactions, transforming EGLIFE from a speculative asset into an essential tool for modern finance.
                </p>
            </SectionCard>

            <SectionCard icon={<TriangleAlert className="h-8 w-8 text-primary" />} title="2. Problem Statement">
                <p className="mb-6 text-foreground/80">The digital currency landscape is saturated with projects that, while innovative, often fail to deliver tangible value or long-term sustainability. The majority of token projects suffer from a combination of poor utility, weak tokenomics, and a lack of genuine community incentives. EGLIFE addresses these key problems:</p>
                <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-lg">Absence of Reward Mechanisms</h4>
                            <p className="text-foreground/80">Many tokens do not offer compelling reasons for holders to maintain their positions long-term. Without staking rewards, profit-sharing, or other incentives, tokens are often dumped at the first sign of market volatility. This "mercenary capital" behavior leads to extreme price instability and discourages the formation of a loyal community. EGLIFE solves this by offering a straightforward, on-chain staking system that provides tangible rewards, encouraging users to become long-term stakeholders rather than short-term speculators.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-lg">Lack of Real-World Utility</h4>
                            <p className="text-foreground/80">A significant number of cryptocurrencies exist purely as speculative assets with no integration into daily life. This limits their adoption to a niche audience of traders and investors, rather than the general public. EGLIFE is designed from the ground up to power the EGPAY platform, enabling users to pay for real services like utility bills and mobile recharges. This focus on practical application makes EGLIFE a tool for financial management, not just an object of speculation.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-lg">Unfair Token Allocations</h4>
                            <p className="text-foreground/80">Many projects allocate a disproportionately large share of tokens to the team and private investors, often with short vesting periods. This structure can lead to "pump and dump" schemes where insiders exit at the expense of the community, damaging trust and long-term viability. EGLIFE's tokenomics are designed for fair distribution, with the largest portions allocated to community growth and ecosystem development, ensuring that the project's success is aligned with the interests of its users.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-lg">High Token Inflation Without Supply Control</h4>
                            <p className="text-foreground/80">Projects often mint excessive tokens for rewards or operational costs without a counteracting deflationary mechanism. This leads to high inflation, which devalues the token over time and erodes holder confidence and purchasing power. EGLIFE addresses this with a fixed total supply minted at inception and a voluntary burn mechanism, giving the community tools to manage inflation and preserve the token's long-term value.</p>
                        </div>
                    </li>
                </ul>
            </SectionCard>
            
            <SectionCard icon={<Eye className="h-8 w-8 text-primary" />} title="3. Vision & Mission">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold text-xl mb-3">Our Vision</h3>
                        <p className="text-foreground/80 leading-relaxed">To empower every generation with easy-to-use decentralized financial solutions backed by blockchain. We envision a future where financial tools are not confined by traditional banking systems, but are accessible, transparent, and controlled by the users themselves. By simplifying the complexities of cryptocurrency, we aim to bridge the gap between digital assets and everyday life, creating an inclusive ecosystem where individuals from all walks of life can confidently participate in the digital economy.</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-xl mb-3">Our Mission</h3>
                        <p className="text-foreground/80 leading-relaxed">Our mission is to provide real utility, encourage mass adoption through user-friendly design, deliver radical transparency with on-chain operations, and create a unified, self-sustaining ecosystem where users can earn, save, and spend. We are committed to breaking down the barriers to entry and building a more equitable financial landscape for generations to come, starting in India and expanding globally.</p>
                    </div>
                </div>
            </SectionCard>
            
            <SectionCard icon={<Lightbulb className="h-8 w-8 text-primary" />} title="4. Token Utility">
                <p className="mb-6 text-foreground/80">The EGLIFE Token is the native cryptocurrency of our ecosystem, designed with a clear focus on real-world application. Its utility is centered around providing tangible value and seamless integration into the daily financial activities of our users. The core utilities include:</p>
                <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-lg">On-Chain Staking & Yield Generation</h4>
                            <p className="text-foreground/80">Token holders can lock their EGLIFE tokens in our on-chain staking contract to earn a passive yield. This mechanism serves two critical purposes: it directly rewards long-term supporters of the project with additional tokens, and it reduces the available circulating supply, which can contribute to price stability. By incentivizing holding over selling, we foster a more stable and committed community.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-4">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-lg">Core Currency for EGPAY Services</h4>
                            <p className="text-foreground/80">EGLIFE is the exclusive currency for all transactions on the EGPAY platform. Users will use EGLIFE to pay for a wide range of real-world services, including mobile recharges, electricity bills, gas payments, and more. This creates a constant, organic demand for the token, as its utility is directly tied to essential daily activities, moving it beyond a purely speculative asset.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-4">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-lg">Fee Payments & Discounts</h4>
                            <p className="text-foreground/80">All transaction fees within the EGPAY ecosystem will be settled in EGLIFE. Furthermore, holding a certain amount of EGLIFE may grant users access to tiered benefits, such as reduced transaction fees or special discounts on services, providing an additional layer of utility and encouraging users to maintain a balance in their wallets.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-4">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-lg">Eligibility for Referral Rewards</h4>
                            <p className="text-foreground/80">To participate in our multi-level referral program and earn bonuses, a user must have an active stake in EGLIFE. This links network growth directly to token ownership, ensuring that those who are most invested in the project are the ones who are rewarded for helping it grow.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-lg">Future Governance Rights</h4>
                            <p className="text-foreground/80">As outlined in our roadmap, we plan to transition to a Decentralized Autonomous Organization (DAO). In this model, holding and staking EGLIFE tokens will grant users voting rights on key proposals, such as changes to the protocol, treasury allocations, and the introduction of new features. This will give our community direct control over the future direction of the project.</p>
                        </div>
                    </li>
                </ul>
            </SectionCard>
            
            <SectionCard icon={<Network className="h-8 w-8 text-primary" />} title="5. The EGLIFE Ecosystem">
                <p className="mb-6 text-foreground/80">The EGLIFE Ecosystem is a multi-faceted platform designed to seamlessly integrate cryptocurrency into everyday life. At its core is **EGPAY**, our flagship application powered by the EGLIFE Token. The ecosystem is built on a foundation of real-world utility, community incentives, and deflationary tokenomics, creating a self-sustaining financial loop where users can earn, spend, and grow their assets.</p>
                <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-lg">Utility Payments (EGPAY)</h4>
                            <p className="text-foreground/80">The primary function of the EGLIFE ecosystem is to serve as a decentralized payment gateway for essential services. Through the EGPAY application, users can convert the value of their EGLIFE tokens to pay for a wide array of real-world utilities. This includes, but is not limited to, mobile recharges (prepaid and postpaid), electricity bills, water bills, piped gas, and DTH recharges. By providing a practical and convenient way to use crypto for non-discretionary spending, we create consistent, organic demand for the EGLIFE token, independent of speculative market trends.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-4">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-lg">Airdrop & Referral Campaigns</h4>
                            <p className="text-foreground/80">Community growth is the lifeblood of any decentralized project. Our ecosystem includes built-in mechanisms to foster rapid and organic user adoption. We will conduct strategic **Airdrop Campaigns** to distribute tokens to early adopters and active community members, creating an initial user base. Furthermore, our **Multi-Level Referral Program** rewards users for bringing new participants into the ecosystem. When a referred user stakes EGLIFE, the referrer earns an instant bonus, creating a powerful, viral marketing engine driven by the community itself.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-4">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-lg">Voluntary Token Burn Mechanism</h4>
                            <p className="text-foreground/80">To combat inflation and promote long-term value appreciation, the EGLIFE smart contract includes a public `burn` function. This allows any token holder, including the project treasury, to permanently remove a portion of tokens from the total supply by sending them to an irrecoverable "dead" address. This deflationary pressure can increase the token's scarcity over time. The burn mechanism provides a transparent and community-participatory way to manage the token's economic model, aligning the interests of all stakeholders toward sustainable growth.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-4">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-lg">Merchant Acceptance (Phase 2)</h4>
                            <p className="text-foreground/80">Looking ahead, the ecosystem will expand to include direct merchant services. Our long-term goal is to develop and integrate a **Point-of-Sale (POS) system** and payment gateway for online and offline businesses. This will enable a network of partner merchants—from local shops to e-commerce stores—to accept EGLIFE as a direct payment method. This phase will complete the financial loop, allowing users to earn rewards through staking and then spend those rewards on a wide variety of goods and services, making EGLIFE a truly comprehensive medium of exchange.</p>
                        </div>
                    </li>
                </ul>
            </SectionCard>
            
            <SectionCard icon={<Cpu className="h-8 w-8 text-primary" />} title="6. Technology Overview">
                <p className="mb-6 text-foreground/80">The EGLIFE Token is built on a foundation of proven, secure, and scalable technologies to ensure reliability and a seamless user experience.</p>
                 <Table>
                     <TableHeader>
                         <TableRow>
                             <TableHead>Component</TableHead>
                             <TableHead>Specification</TableHead>
                         </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow><TableCell>Blockchain</TableCell><TableCell>Binance Smart Chain (BNB Chain)</TableCell></TableRow>
                        <TableRow><TableCell>Smart Contract Language</TableCell><TableCell>Solidity 0.8.20</TableCell></TableRow>
                        <TableRow><TableCell>Library</TableCell><TableCell>OpenZeppelin v4.9.0 (Audit-grade)</TableCell></TableRow>
                        <TableRow><TableCell>Standard</TableCell><TableCell>BEP-20 (compatible with ERC-20)</TableCell></TableRow>
                        <TableRow><TableCell>Verification</TableCell><TableCell>Fully verified on BscScan with source code</TableCell></TableRow>
                        <TableRow><TableCell>Deployment Address</TableCell><TableCell className="font-mono text-xs">0xca326a5e15b9451efC1A6BddaD6fB098a4D09113</TableCell></TableRow>
                     </TableBody>
                 </Table>
            </SectionCard>

            <SectionCard icon={<ShieldCheck className="h-8 w-8 text-primary" />} title="7. Smart Contract Design">
                 <p className="mb-6 text-foreground/80">The EGLIFE smart contract is engineered with modularity and security at its core, incorporating several key functions to manage the token's lifecycle and utility. The following modules are integral to its design:</p>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" /><div><h4 className="font-semibold">BEP-20 Compliance</h4><p className="text-foreground/80">The contract strictly adheres to the BEP-20 standard using OpenZeppelin's extensively audited implementation.</p></div></li>
                    <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" /><div><h4 className="font-semibold">Tax Fee Mechanism</h4><p className="text-foreground/80">A configurable tax fee (default 2%, max 10%) can be applied to transactions to fund the project's ongoing development.</p></div></li>
                    <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" /><div><h4 className="font-semibold">Voluntary Token Burn</h4><p className="text-foreground/80">The contract includes a public `burn` function, allowing any token holder to permanently remove their tokens from the circulating supply.</p></div></li>
                    <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" /><div><h4 className="font-semibold">On-Chain Staking Logic</h4><p className="text-foreground/80">The contract features a trustless staking system where users lock tokens for 30 days to earn a 5% reward, minted upon withdrawal.</p></div></li>
                </ul>
            </SectionCard>

            <SectionCard icon={<GanttChartSquare className="h-8 w-8 text-primary" />} title="8. Staking Plan">
                 <p className="mb-6 text-foreground/80">The EGLIFE tiered staking plan is designed to reward community members based on their commitment level. The APY and tier ranges are configurable by the admin to adapt to market conditions.</p>
                 <Table>
                     <TableHeader>
                         <TableRow>
                             <TableHead>Package Name</TableHead>
                             <TableHead>Staking Amount (EGLIFE)</TableHead>
                             <TableHead className="text-right">APY</TableHead>
                         </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow><TableCell>Starter Stake</TableCell><TableCell>10 - 100</TableCell><TableCell className="text-right font-semibold text-primary">12%</TableCell></TableRow>
                        <TableRow><TableCell>Bronze Stake</TableCell><TableCell>101 - 500</TableCell><TableCell className="text-right font-semibold text-primary">18%</TableCell></TableRow>
                        <TableRow><TableCell>Silver Stake</TableCell><TableCell>501 - 1,000</TableCell><TableCell className="text-right font-semibold text-primary">20%</TableCell></TableRow>
                        <TableRow><TableCell>Gold Stake</TableCell><TableCell>1,001 - 5,000</TableCell><TableCell className="text-right font-semibold text-primary">22%</TableCell></TableRow>
                        <TableRow><TableCell>Platinum Stake</TableCell><TableCell>5,001 - 10,000</TableCell><TableCell className="text-right font-semibold text-primary">24%</TableCell></TableRow>
                        <TableRow><TableCell>Diamond Stake</TableCell><TableCell>10,001 - ∞</TableCell><TableCell className="text-right font-semibold text-primary">26%</TableCell></TableRow>
                     </TableBody>
                 </Table>
                  <ul className="mt-6 space-y-4 text-sm">
                    <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" /><div><strong>Lock Period:</strong> 365 Days (principal locked; rewards claimable anytime)</div></li>
                    <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" /><div><strong>Early Unstake Penalty:</strong> 5% of staked amount + loss of unclaimed rewards</div></li>
                    <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" /><div><strong>Reward Claim:</strong> Anytime after accumulated rewards reach at least 1 EGLIFE.</div></li>
                </ul>
            </SectionCard>

            <SectionCard icon={<BookOpen className="h-8 w-8 text-primary" />} title="9. Referral Plan">
                 <p className="mb-6 text-foreground/80">Our multi-level referral plan is designed to incentivize community growth. Referrers must have an active stake to be eligible for bonuses, which are paid instantly from the staking deposits of their referred users.</p>
                 <Table>
                     <TableHeader>
                         <TableRow>
                             <TableHead>Level</TableHead>
                             <TableHead className="text-right">Bonus % of Staked Amount</TableHead>
                         </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow><TableCell>Level 1</TableCell><TableCell className="text-right font-semibold text-primary">10%</TableCell></TableRow>
                        <TableRow><TableCell>Level 2</TableCell><TableCell className="text-right font-semibold text-primary">5%</TableCell></TableRow>
                        <TableRow><TableCell>Level 3</TableCell><TableCell className="text-right font-semibold text-primary">3%</TableCell></TableRow>
                        <TableRow><TableCell>Level 4</TableCell><TableCell className="text-right font-semibold text-primary">2%</TableCell></TableRow>
                        <TableRow><TableCell>Level 5</TableCell><TableCell className="text-right font-semibold text-primary">1%</TableCell></TableRow>
                        <TableRow><TableCell>Level 6</TableCell><TableCell className="text-right font-semibold text-primary">1%</TableCell></TableRow>
                        <TableRow><TableCell>Level 7</TableCell><TableCell className="text-right font-semibold text-primary">0.5%</TableCell></TableRow>
                        <TableRow><TableCell>Level 8</TableCell><TableCell className="text-right font-semibold text-primary">0.5%</TableCell></TableRow>
                        <TableRow><TableCell>Level 9</TableCell><TableCell className="text-right font-semibold text-primary">0.25%</TableCell></TableRow>
                        <TableRow><TableCell>Level 10</TableCell><TableCell className="text-right font-semibold text-primary">0.25%</TableCell></TableRow>
                        <TableRow><TableCell>Beyond 10 Levels (Royalty)</TableCell><TableCell className="text-right font-semibold text-primary">0.1%</TableCell></TableRow>
                     </TableBody>
                 </Table>
            </SectionCard>

            <SectionCard icon={<FileJson className="h-8 w-8 text-primary" />} title="10. Tokenomics">
                 <p className="mb-6 text-foreground/80">A fixed total supply of <strong>1,000,000,000 EGLIFE</strong> is strategically distributed to ensure a balanced, sustainable, and community-focused ecosystem.</p>
                <div className="space-y-4">
                    <p><strong>Public Airdrop: 10%</strong> (100,000,000) - For community-building and marketing.</p>
                    <p><strong>Staking Rewards: 20%</strong> (200,000,000) - To provide sustainable returns for stakers.</p>
                    <p><strong>Ecosystem Growth: 30%</strong> (300,000,000) - For long-term development and partnerships.</p>
                    <p><strong>Liquidity Pool: 20%</strong> (200,000,000) - To ensure a healthy trading environment on DEXs.</p>
                    <p><strong>Team & Advisors: 10%</strong> (100,000,000) - Subject to a vesting schedule to align long-term interests.</p>
                    <p><strong>Burn & Reserve: 10%</strong> (100,000,000) - For contingency and future deflationary burn events.</p>
                </div>
            </SectionCard>

            <SectionCard icon={<Rocket className="h-8 w-8 text-primary" />} title="11. Roadmap">
                <ul className="space-y-6">
                    <li><strong>Phase 1 (Q2 2025):</strong> Foundation & Pre-Launch - Smart contract deployment, website launch, whitepaper publication.</li>
                    <li><strong>Phase 2 (Q3 2025):</strong> Security & Market Prep - Smart contract audit, listings on data aggregators.</li>
                    <li><strong>Phase 3 (Q4 2025):</strong> Community Growth & Market Entry - Liquidity pool creation, airdrop campaigns, staking platform launch.</li>
                    <li><strong>Phase 4 (Q1 2026):</strong> Platform Development & Beta Launch - EGLIFE App beta release.</li>
                    <li><strong>Phase 5 (Q2 2026):</strong> Full Ecosystem Launch - Public launch of EGPAY v1 for utility payments.</li>
                    <li><strong>Phase 6 (Q3 2026):</strong> Merchant Integration & POS Support - Infrastructure for point-of-sale systems.</li>
                    <li><strong>Phase 7 (Q4 2026):</strong> Global Expansion & New Utilities - Focus on international markets.</li>
                    <li><strong>Phase 8 (2027 & Beyond):</strong> Decentralized Governance & DAO - Transition to a community-governed DAO.</li>
                </ul>
            </SectionCard>

            <SectionCard icon={<Scale className="h-8 w-8 text-primary" />} title="12. Legal & Regulatory Compliance">
                <p className="text-foreground/80 leading-relaxed">
                    The EGLIFE Token is a utility token intended for use within our ecosystem and is not a security. We are committed to adhering to all applicable laws and regulations in the jurisdictions where we operate, including KYC/AML requirements where necessary. We operate on a principle of radical transparency, with our smart contracts publicly verified on BscScan.
                </p>
            </SectionCard>

            <SectionCard icon={<Users2 className="h-8 w-8 text-primary" />} title="13. Team">
                <p className="text-foreground/80 leading-relaxed">
                    The EGLIFE project is driven by a combination of experienced professionals and a decentralized network of contributors. Key roles such as Project Lead, Legal Advisor, and other strategic Advisors will be announced at future strategic milestones. The core development is handled by vetted, anonymous Solidity contributors, in line with DeFi security best practices. The heart of our project is our vibrant and dedicated community of volunteers across India.
                </p>
            </SectionCard>

            <SectionCard icon={<TriangleAlert className="h-8 w-8 text-primary" />} title="14. Risk Factors">
                 <p className="text-foreground/80 leading-relaxed">
                    Prospective participants should be fully aware of the inherent risks, including but not limited to: crypto market volatility, shifting regulations, technical errors or bugs in the smart contract, security attacks, and potential delays in platform adoption or partnerships. Do not invest more than you are willing to lose.
                </p>
            </SectionCard>

            <SectionCard icon={<FileText className="h-8 w-8 text-primary" />} title="15. Disclaimer for Stakeholders">
                 <p className="text-foreground/80 leading-relaxed">
                   This whitepaper does not constitute financial advice. The APY for staking is not guaranteed and is subject to change. While we prioritize security and will conduct a third-party audit, smart contracts always carry inherent risks. There is no guarantee of returns.
                </p>
            </SectionCard>
            
            <SectionCard icon={<GitCommit className="h-8 w-8 text-primary" />} title="16. Conclusion">
                <p className="text-foreground/80 leading-relaxed">
                    EGLIFE represents a pivotal step forward in the evolution of cryptocurrency, deliberately moving beyond speculation to establish tangible, real-world value. Our core mission is to bridge the gap between the digital economy and everyday life. Through a clear and strategic roadmap, robust staking and referral incentives, and an unwavering commitment to security and transparency, we are building more than just a token; we are cultivating a self-sustaining ecosystem. We invite you to join us in creating a new era of decentralized finance.
                </p>
            </SectionCard>
        </div>
      </div>
    );
  }

    
