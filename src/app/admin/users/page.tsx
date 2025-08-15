
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Search, PlusCircle, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/lib/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    registrationDate: string;
    kycStatus: "Verified" | "Pending" | "Rejected";
    stakingStatus: "Active" | "Inactive";
    aiHint?: string;
}

const kycStatusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
  Verified: "default",
  Pending: "secondary",
  Rejected: "destructive",
};


export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, "users");
                const userSnapshot = await getDocs(usersCollection);
                const usersList = userSnapshot.docs.map(doc => {
                    const data = doc.data();
                    // Convert Firestore Timestamp to a readable date string
                    const registrationDate = data.registrationDate instanceof Timestamp 
                        ? data.registrationDate.toDate().toLocaleDateString() 
                        : new Date().toLocaleDateString();
                    
                    return {
                        id: doc.id,
                        name: data.name || 'N/A',
                        email: data.email || 'N/A',
                        registrationDate: registrationDate,
                        kycStatus: data.kycStatus || 'Pending',
                        stakingStatus: data.stakingStatus || 'Inactive',
                        // You might want to add a default avatar or logic to generate one
                        avatar: `https://avatar.vercel.sh/${data.email}.png`,
                        aiHint: "user portrait"
                    } as User;
                });
                setUsers(usersList);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

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
                             {users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map(user => (
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
                                        {user.registrationDate}
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
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
