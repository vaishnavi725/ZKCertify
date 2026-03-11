"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1">
          <img src="/zk-certify_logo.png" alt="ZK-Certify Logo" className="h-12 w-22" />
          <Link
            href="/"
            className="text-xl font-bold tracking-tight hover:opacity-80 transition-colors"
          >
            ZK-Certify
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <SignedIn>
            <Link
              href="/academic"
              className="hover:text-primary transition-colors"
            >
              Academic Verification
            </Link>
            <Link href="/pan" className="hover:text-primary transition-colors">
              Pancard Verification
            </Link>
            <Link href="/name" className="hover:text-primary transition-colors">
              Name Verification
            </Link>
          </SignedIn>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
