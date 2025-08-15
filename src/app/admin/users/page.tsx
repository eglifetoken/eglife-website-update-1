
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Search, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  {
    id: "usr_1",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400",
    registrationDate: "2024-07-20",
    kycStatus: "Verified",
    stakingStatus: "Active",
    aiHint: "man portrait"
  },
  {
    id: "usr_2",
    name: "Samantha Carter",
    email: "sam.c@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
    registrationDate: "2024-07-18",
    kycStatus: "Pending",
    stakingStatus: "Inactive",
    aiHint: "woman portrait"
  },
  {
    id: "usr_3",
    name: "Ben Richards",
    email: "ben.r@example.com",
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=400",
    registrationDate: "2024-07-15",
    kycStatus: "Verified",
    stakingStatus: "Active",
    aiHint: "man smiling"
  },
  {
    id: "usr_4",
    name: "Olivia Chen",
    email: "olivia.c@example.com",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400",
    registrationDate: "2024-07-12",
    kycStatus: "Rejected",
    stakingStatus: "Inactive",
    aiHint: "woman face"
  },
  {
    id: "usr_5",
    name: "Marcus Rivera",
    email: "marc.r@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
    registrationDate: "2024-07-10",
    kycStatus: "Verified",
    stakingStatus: "Active",
    aiHint: "man profile"
  },
];

const kycStatusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
  Verified: "default",
  Pending: "secondary",
  Rejected: "destructive",
};


export default function AdminUsersPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-headline font-bold">User Management</h1>
                    <p className="text-muted-foreground">View, manage, and take action on platform users.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Add User
                </Button>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>A list of all registered users in the EGLIFE ecosystem.</CardDescription>
                    <div className="relative pt-4">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by name, email, or status..." className="pl-8" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead className="hidden md:table-cell">Registration Date</TableHead>
                                <TableHead>KYC Status</TableHead>
                                <TableHead className="hidden md:table-cell">Staking Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.aiHint} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {new Date(user.registrationDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={kycStatusVariant[user.kycStatus]}>{user.kycStatus}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge variant={user.stakingStatus === "Active" ? "secondary" : "outline"} className={user.stakingStatus === 'Active' ? 'bg-green-500/20 text-green-700 border-green-400' : ''}>
                                            {user.stakingStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive">Suspend Account</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
