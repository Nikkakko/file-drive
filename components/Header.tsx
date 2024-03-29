import {
  OrganizationSwitcher,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import * as React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className="border-b py-4 bg-gray-50">
      <div className="container mx-auto justify-between flex items-center">
        <Link href="/">FileDrive</Link>
        <div className="flex items-center gap-2">
          <OrganizationSwitcher />
          <UserButton afterSignOutUrl="/" />
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
