
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
    FileText
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

            <SectionCard icon={<AlertTriangle className="h-8 w-8 text-primary" />} title="2. Problem Statement">
                <p className="mb-6 text-foreground/80">The digital currency landscape is saturated with projects that fail to deliver tangible value or long-term sustainability due to poor utility, weak tokenomics, and a lack of community incentives. EGLIFE addresses these key problems:</p>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">Absence of Reward Mechanisms</h4>
                            <p className="text-foreground/80">Many tokens lack compelling reasons for long-term holding, leading to price instability. EGLIFE solves this by offering a straightforward, on-chain staking system that rewards users for their commitment.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">Lack of Real-World Utility</h4>
                            <p className="text-foreground/80">A significant number of cryptocurrencies exist purely as speculative assets. EGLIFE is designed from the ground up to power the EGLIFE ecosystem, enabling users to pay for real services.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">Unfair Token Allocations</h4>
                            <p className="text-foreground/80">Many projects allocate a disproportionately large share of tokens to the team and private investors. EGLIFE's tokenomics are designed for fair distribution, with significant portions allocated to community growth.</p>
                        </div>
                    </li>
                </ul>
            </SectionCard>
            
            <SectionCard icon={<Eye className="h-8 w-8 text-primary" />} title="3. Vision & Mission">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold text-xl mb-2">Vision</h3>
                        <p className="text-foreground/80">To empower every generation with easy-to-use decentralized financial solutions backed by blockchain. We envision a future where financial tools are accessible, transparent, and controlled by the users themselves, bridging the gap between digital assets and everyday life.</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-xl mb-2">Mission</h3>
                        <p className="text-foreground/80">Our mission is to provide real utility, encourage mass adoption through user-friendly design, deliver radical transparency with on-chain operations, and create a unified, self-sustaining ecosystem where users can earn, save, and spend.</p>
                    </div>
                </div>
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
        </div>
      </div>
    );
  }

    