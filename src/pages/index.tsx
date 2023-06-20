import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Background from "~/components/Background";
import { NAVBAR_HEIGHT } from "~/constants/styles";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data } = api.problems.getAll.useQuery();

  return (
    <>
      <Head>
        <title>QueetCode</title>
        <meta name="description" content="Leetcode for Quant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Background>
        <div id="content-wrapper" className="mt-12 h-[calc(100vh-48px)] w-full">
          <div
            id="content"
            className="mx-auto grid h-full w-full grow grid-cols-4 gap-4 p-4 pb-0 md:max-w-6xl md:grid-cols-3 md:p-6 md:pb-0 lg:max-w-6xl lg:grid-cols-4 lg:gap-6"
          >
            <div
              id="right-container"
              className="grid h-full grid-rows-3 gap-4 md:col-span-2 lg:col-span-3"
            >
              <div className="b grid grid-cols-3 gap-4 rounded-sm border-b-[3px] border-neutral-700 pb-4 pt-0.5">
                <div className="rounded-lg bg-neutral-800 shadow-dark-1"></div>
                <div className="rounded-lg bg-neutral-800 shadow-dark-1"></div>
                <div className="rounded-lg bg-neutral-800 shadow-dark-1"></div>
              </div>
              {/* <SignedIn>
                <SignOutButton>
                  <button className="btn">Sign out</button>
                </SignOutButton>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="btn">Sign in</button>
                </SignInButton>
              </SignedOut> */}

              <div className="row-span-2 rounded-t-lg bg-neutral-800 px-8 shadow-dark-1">
                <div role="rowgroup">
                  <div
                    role="row"
                    className="flex flex-auto border-b border-neutral-700 text-[14px] text-neutral-400"
                  >
                    <div
                      role="columnheader"
                      className="mx-2.5 box-border flex w-12 min-w-0 items-start py-[11px]"
                    >
                      Status
                    </div>
                    <div
                      role="columnheader"
                      className="mx-2.5 box-border flex w-80 min-w-0 items-start py-[11px]"
                    >
                      Title
                    </div>
                    <div
                      role="columnheader"
                      className="mx-2.5 box-border flex w-20 min-w-0 items-start py-[11px]"
                    >
                      Difficulty
                    </div>
                  </div>
                  {data?.map((problem) => (
                    <div
                      role="row"
                      key={problem.id}
                      className="flex flex-auto text-[14px] text-white odd:bg-neutral-700"
                    >
                      <div
                        role="cell"
                        className="mx-2.5 box-border flex w-12 min-w-0 items-center py-[11px] "
                      ></div>
                      <div
                        role="cell"
                        className="mx-2.5 box-border flex w-80 min-w-0 items-center py-[11px] "
                      >
                        <div className="flex max-w-[320px] items-center overflow-hidden">
                          <div className="overflow-hidden">
                            <div className="flex items-center">
                              <div className="truncate">
                                <Link
                                  href="problems/[url]"
                                  as={`/problems/${problem.url}`}
                                  className="h-5 hover:text-blue-500"
                                >
                                  {problem.id - 1}. {problem.title}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        role="cell"
                        className="mx-2.5 box-border flex w-20 min-w-0 items-center py-[11px]"
                      >
                        <span
                          className={
                            problem.difficulty === "Easy"
                              ? "text-easy"
                              : problem.difficulty === "Medium"
                              ? "text-medium"
                              : "text-hard"
                          }
                        >
                          {problem.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div id="left-container" className="col-span-4 md:col-span-1">
              <div className="pt-0.5 md:top-3">
                <div className="lc-xl:mt-[39px] relative mt-[39px] flex flex-col rounded-lg bg-neutral-800 py-2 pb-[2px] shadow-dark-1 md:mt-0">
                  <div className="h-96"></div>
                </div>
                <div className="mt-4 hidden space-y-4 md:block"></div>
                <div className="lc-xl:mt-[39px] relative mt-[39px] flex flex-col rounded-lg bg-neutral-800 py-2 pb-[2px] shadow-dark-1 md:mt-0">
                  <div className="h-64"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Background>
    </>
  );
};

export default Home;
