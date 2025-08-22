
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
    answer: "There is no official minimum, but you must have enough EGLIFE to cover the transaction fees."
  },
  {
    question: "How long is my principal amount locked for?",
    answer: "Your principal staked amount is locked for a period of 30 days."
  },
  {
    question: "When do I receive my staking reward?",
    answer: "You receive a one-time, 5% reward on your staked amount when you unstake your tokens after the 30-day lock period."
  },
  {
    question: "Can I unstake my tokens early?",
    answer: "No. The smart contract does not allow for early unstaking. You must wait for the full 30-day lock period to end before you can withdraw your tokens."
  },
  {
    question: "What happens if I stake multiple times?",
    answer: "Each time you stake, it overwrites your previous stake. The new staked amount and the 30-day lock timer will reset from the moment of your latest stake."
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
