// src/components/Navbar.tsx

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={`absolute h-12 w-full`}>
      <div className="mx-auto flex h-full flex-row justify-between px-6 md:max-w-6xl lg:max-w-6xl">
        <div className="flex h-full items-center">
          <Link
            href="/"
            className={`ml-8 h-full leading-[3rem] tracking-wide text-neutral-400 transition-colors duration-300 ease-in-out hover:text-neutral-100 ${
              router.pathname === "/" ? "border-b-2" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/explore"
            className={`ml-8 h-full leading-[3rem] tracking-wide text-neutral-400 transition-colors duration-300 ease-in-out hover:text-neutral-100 ${
              router.pathname === "/explore" ? "border-b-2" : ""
            }`}
          >
            Explore
          </Link>
          <Link
            href="/problems"
            className={`ml-8 h-full leading-[3rem] text-neutral-400 transition-colors duration-300 ease-in-out hover:text-neutral-100 ${
              router.pathname === "/problems" ? "border-b-2" : ""
            }`}
          >
            Problems
          </Link>
          <Link
            href="/discuss"
            className={`ml-8 h-full leading-[3rem] text-neutral-400 transition-colors duration-300 ease-in-out hover:text-neutral-100 ${
              router.pathname === "/discuss" ? "border-b-2" : ""
            }`}
          >
            Discuss
          </Link>
        </div>
        <div className="flex h-full items-center text-white">
          <SignedIn>
            {/* Mount the UserButton component */}
            <div className="mr-4 flex h-full items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
                className="mr-4 text-neutral-400 transition-colors duration-300 ease-in-out hover:text-neutral-100"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.204 15.817a8.872 8.872 0 01-.066.115h11.724a8.535 8.535 0 01-.066-.115c-.92-1.627-1.463-3.806-1.463-6.6 0-2.279-1.932-4.142-4.333-4.142-2.401 0-4.333 1.863-4.333 4.143 0 2.793-.543 4.972-1.463 6.6zM20 17.932H4c-.998 0-1.38-1.301-.54-1.841.201-.13.586-.522 1.003-1.258.746-1.32 1.204-3.158 1.204-5.615 0-3.401 2.843-6.143 6.333-6.143s6.333 2.742 6.333 6.143c0 2.457.458 4.296 1.204 5.615.417.736.802 1.128 1.004 1.258.84.54.457 1.841-.541 1.841zm-7.063 1.346a1 1 0 111.714 1.031A3.09 3.09 0 0112 21.79a3.09 3.09 0 01-2.651-1.48 1 1 0 011.714-1.032c.188.314.545.512.937.512s.748-.198.937-.512z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="btn text-sm tracking-wide text-neutral-300 transition-colors duration-300 ease-in-out hover:text-neutral-100">
                Register
              </button>
            </SignUpButton>
            <span className="mx-4 text-sm text-neutral-400">or</span>
            <SignInButton mode="modal">
              <button className="btn text-sm tracking-wide text-neutral-300 transition-colors duration-300 ease-in-out hover:text-neutral-100">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
