
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
import { LineChart } from "lucide-react"

interface RewardsHistoryDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  dailyRewards: { date: string; reward: number }[];
  totalEarned: number;
}

export function RewardsHistoryDialog({
  isOpen,
  onOpenChange,
  dailyRewards,
  totalEarned,
}: RewardsHistoryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
           <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-primary/10 rounded-md w-fit">
                    <LineChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <DialogTitle className="font-headline text-2xl">Daily Rewards History</DialogTitle>
                    <DialogDescription>
                        A log of your daily staking rewards. Total Earned: {totalEarned.toFixed(4)} EGLIFE
                    </DialogDescription>
                </div>
           </div>
        </DialogHeader>
        <div className="mt-4">
          {dailyRewards.length > 0 ? (
            <ScrollArea className="h-96">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Reward Earned (EGLIFE)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyRewards.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.date}</TableCell>
                      <TableCell className="text-right font-semibold text-green-500">+{item.reward.toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <div className="text-center h-64 flex flex-col justify-center items-center">
                <p className="text-lg font-semibold">No history found.</p>
                <p className="text-muted-foreground">You have not earned any rewards yet.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
