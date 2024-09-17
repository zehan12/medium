"use client";
import PasswordChecklist from "react-password-checklist";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { PasswordStrength } from "./password-strength";

export const RegisterForm = () => {
    return (
        <section className="mx-auto flex flex-col justify-center">
            <div className="space-y-2 text-center">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                    Or{" "}
                    <Button variant={"link"}>
                        <Link
                            href={ROUTES.REGISTER_URL}
                            className="font-medium text-primary hover:text-primary/90"
                            prefetch={false}
                        >
                            sign up for a new account
                        </Link>
                    </Button>
                </p>
                <p className="text-muted-foreground text-xs text-left py-2">
                    Enter your Credentials to access your account.
                </p>
            </div>

            <form onSubmit={() => {}} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <PasswordStrength password={""} />
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                    <PasswordChecklist
                        rules={[
                            "minLength",
                            "specialChar",
                            "number",
                            "capital",
                            "match",
                        ]}
                        minLength={5}
                        value={""}
                        onChange={(isValid: any) => {}}
                    />
                </div>

                <Button type="submit" className="w-full">
                    Sign in
                </Button>
            </form>
        </section>
    );
};
