/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEthers } from "@usedapp/core";
import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { textContent } from "../../constants";
import Account from "../Common/Account";
import ActionButton from "../Common/ActionButton";
const Header: FC<Record<string, never>> = function () {
  const { activateBrowserWallet, active, account, deactivate, isLoading } =
    useEthers();
  const { pathname } = useRouter();
  //const { luksoBrowserWalletOn, setLuksoBrowserWalletOn } = useBSR();

  return (
    <header className="sticky top-0 z-20 border-b">
      <Navbar fluid>
        <Navbar.Brand href="/">
          <span className="ml-2 whitespace-nowrap text-2xl font-semibold dark:text-white">
            {textContent.brand}
          </span>
          <span className="ml-2 text-xs dark:text-slate-300 sm:text-sm">
            {textContent.subTextBrand}
          </span>
        </Navbar.Brand>
        <Navbar.Collapse>
          {[
            { label: "Deploy", path: "/deploy" },
            { label: "Manage", path: "/manage" },
            { label: "Vote", path: "/vote" },
            { label: "Recover", path: "/recover" },
          ].map((item, i) => (
            <Link key={i} href={item.path}>
              <a className="hover:underline dark:text-white">{item.label}</a>
            </Link>
          ))}
        </Navbar.Collapse>
        <div className="flex items-center justify-center space-x-1 py-2 sm:order-2 sm:py-0">
          {/* <ToggleSwitch
            label="Lukso Browser Wallet"
            checked={luksoBrowserWalletOn}
            onChange={setLuksoBrowserWalletOn}
          /> */}
          {pathname !== "/" && (
            <div>
              {active && account ? (
                <div className="flex items-center">
                  <Account account={account} />
                  <Button onClick={deactivate} color="failure" size="sm">
                    disconnect
                  </Button>
                </div>
              ) : (
                <ActionButton
                  label="connect"
                  onClick={activateBrowserWallet}
                  isLoading={isLoading}
                />
              )}
            </div>
          )}
          <Navbar.Toggle />
          <DarkThemeToggle />
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
