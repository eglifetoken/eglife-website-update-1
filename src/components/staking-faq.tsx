
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
    answer: "There is no official minimum, but you must have enough EGLIFE to cover the transaction fees. The contract requires an amount greater than zero."
  },
  {
    question: "How long is my principal amount locked for?",
    answer: "Your stake is locked for 365 days to earn the full reward. You can unstake earlier, but you will incur a penalty."
  },
  {
    question: "How are staking rewards calculated?",
    answer: "Rewards are calculated based on the 12% APY and the duration of your stake. The longer you stake, the more rewards you accrue."
  },
  {
    question: "Can I unstake my tokens early?",
    answer: "Yes, you can unstake at any time. However, if you unstake before the 365-day lock period is complete, a 5% penalty will be deducted from your total return (principal + rewards)."
  },
  {
    question: "What happens if I want to stake more tokens?",
    answer: "The current contract allows only one active stake per wallet. To add more funds, you must first unstake your current amount (which may incur a penalty) and then create a new stake with the total desired amount."
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

    