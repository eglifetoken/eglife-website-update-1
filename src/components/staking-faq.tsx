
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "What is the minimum amount I can stake?",
    answer: "The minimum amount required to start staking is 10 EGLIFE tokens."
  },
  {
    question: "How long is my principal amount locked for?",
    answer: "Your principal staked amount is locked for a period of 365 days to ensure network stability and long-term growth."
  },
  {
    question: "Can I withdraw my rewards before the lock period ends?",
    answer: "Yes, you can claim your earned rewards at any time, as long as you have accumulated a minimum of 1 EGLIFE in rewards."
  },
  {
    question: "What happens if I unstake my tokens early?",
    answer: "If you decide to unstake before the 365-day lock period is over, a 5% penalty will be deducted from your principal staked amount. Additionally, you will forfeit any unclaimed rewards you have accrued."
  },
  {
    question: "How are my staking rewards calculated?",
    answer: "Your rewards are calculated based on your staking tier's APY (Annual Percentage Yield). The daily reward is determined by the formula: (Staked Amount × APY %) ÷ 365. Rewards are calculated continuously and can be tracked on your dashboard."
  },
    {
    question: "Will my APY change if I add more tokens?",
    answer: "Yes. If you add more tokens to your stake and your new total qualifies for a higher tier, your APY will be adjusted to the new, higher rate for the entire staked amount, effective from the moment you add the new tokens."
  }
];


export function StakingFAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
             <AccordionItem value={`item-${index+1}`} key={index}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>
                 {item.answer}
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
  )
}
