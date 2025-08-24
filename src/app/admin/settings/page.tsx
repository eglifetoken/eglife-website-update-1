
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyRound, Bell, Shield, SlidersHorizontal } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your platform's configuration and settings.</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general"><SlidersHorizontal className="mr-2 h-4 w-4" />General</TabsTrigger>
                    <TabsTrigger value="security"><Shield className="mr-2 h-4 w-4" />Security</TabsTrigger>
                    <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
                    <TabsTrigger value="api"><KeyRound className="mr-2 h-4 w-4" />API Keys</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>Update your site's general information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="site-name">Site Name</Label>
                                <Input id="site-name" defaultValue="EGLIFE TOKEN" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="admin-email">Admin Email</Label>
                                <Input id="admin-email" type="email" defaultValue="admin@eglife.com" />
                            </div>
                             <div className="flex items-center space-x-2">
                                <Switch id="maintenance-mode" />
                                <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage security features for the platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <h4 className="font-medium">Two-Factor Authentication (2FA)</h4>
                                    <p className="text-sm text-muted-foreground">Require all admin users to enable 2FA.</p>
                                </div>
                                <Switch />
                            </div>
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <h4 className="font-medium">Automatic Logout</h4>
                                    <p className="text-sm text-muted-foreground">Log out admins after a period of inactivity.</p>
                                </div>
                                <Switch defaultChecked/>
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button>Save Security Settings</Button>
                         </CardFooter>
                    </Card>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>Manage which email notifications are sent to users and admins.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <h4 className="font-medium text-foreground">For Users</h4>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <p className="text-sm">Welcome email on registration</p>
                                <Switch defaultChecked/>
                            </div>
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <p className="text-sm">Notification on successful stake</p>
                                <Switch defaultChecked/>
                            </div>
                            <h4 className="font-medium text-foreground pt-4">For Admins</h4>
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <p className="text-sm">Notification on new user registration</p>
                                <Switch />
                            </div>
                        </CardContent>
                          <CardFooter>
                            <Button>Save Notification Settings</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="api" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Keys</CardTitle>
                            <CardDescription>Manage API keys for third-party integrations like CoinGecko or others.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="gecko-api">GeckoTerminal API Key</Label>
                                <Input id="gecko-api" type="password" placeholder="••••••••••••••••••••" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="bscscan-api">BscScan API Key</Label>
                                <Input id="bscscan-api" type="password" placeholder="••••••••••••••••••••" />
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button>Save API Keys</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
