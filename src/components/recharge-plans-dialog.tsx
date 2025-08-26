
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { RechargePlan } from "@/ai/flows/getRechargePlans"

interface RechargePlansDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  plans: RechargePlan[];
  isLoading: boolean;
  onSelectPlan: (amount: string) => void;
  operatorName: string;
}

export function RechargePlansDialog({
  isOpen,
  onOpenChange,
  plans,
  isLoading,
  onSelectPlan,
  operatorName,
}: RechargePlansDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Recharge Plans for {operatorName}</DialogTitle>
          <DialogDescription>
            Select a plan to automatically fill the recharge amount.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : plans.length > 0 ? (
            <ScrollArea className="h-96">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Amount (₹)</TableHead>
                    <TableHead>Validity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-bold">₹{plan.amount}</TableCell>
                      <TableCell>{plan.validity}</TableCell>
                      <TableCell>{plan.detail}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => onSelectPlan(plan.amount)}
                        >
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <div className="text-center h-64 flex flex-col justify-center items-center">
                <p className="text-lg font-semibold">No plans found.</p>
                <p className="text-muted-foreground">Could not retrieve plans for the selected operator. Please try again later.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
