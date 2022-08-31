/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "flowbite-react";
import Head from "next/head";
import Link from "next/link";
import ActionCard from "../components/Common/ActionCard";
import { textContent } from "../constants";

export default function Home() {
  return (
    <>
      <Head>
        <title>{textContent.homepage.title}</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-72 flex-col items-center justify-center space-y-3 border-b border-slate-400 dark:border-slate-800 sm:h-96">
        <h1 className="text-center text-2xl font-bold dark:text-white sm:text-3xl ">
          {textContent.homepage.valuePropose.title}
        </h1>
        <p className="text-center text-xs text-slate-800 dark:text-slate-300 sm:text-sm ">
          {textContent.homepage.valuePropose.subtitle}
        </p>
        <div className="pt-6 sm:pt-8">
          <Link href="/deploy">
            <a>
              <Button gradientDuoTone="purpleToPink" size="lg">
                Get Started
              </Button>
            </a>
          </Link>
        </div>
      </div>
      <div className="my-auto flex flex-wrap gap-2 py-8 sm:px-8">
        {textContent.homepage.actionsCards.map((action, i) => (
          <ActionCard
            key={i}
            color={["bg-gray-200", "dark:bg-gray-800"]}
            width="w-72"
            height="h-48"
          >
            <div className="flex h-full flex-col items-center justify-between space-y-2">
              <p className="text-center text-sm dark:text-white">
                {action.description}
              </p>
              <div>
                <Link href={action.pathname}>
                  <Button>{action.title}</Button>
                </Link>
              </div>
            </div>
          </ActionCard>
        ))}
      </div>
    </>
  );
}
