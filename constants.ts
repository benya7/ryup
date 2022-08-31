import { Chain } from "@usedapp/core";
import { CustomFlowbiteTheme } from "flowbite-react/lib/esm/components/Flowbite/FlowbiteTheme";

export const flowbiteTheme: CustomFlowbiteTheme = {
  button: {
    size: {
      xs: "text-xs px-2 py-1",
      sm: "text-xs sm:text-sm px-3 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-5 py-2.5",
      xl: "text-base px-6 py-3",
    },
  },
  footer: {
    base: "flex flex-col",
    brand: {
      base: "m-6 flex items-center",
    },
    groupLink: {
      base: "flex flex-col flex-wrap text-gray-500 dark:text-white",
      link: {
        base: "mb-4 last:mr-0 md:mr-6",
      },
    },
    icon: {
      base: "text-gray-400 hover:text-gray-900 dark:hover:text-white",
    },
  },
  modal: {
    body: {
      base: "space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8",
    },
  },
  navbar: {
    inner: {
      base: "mx-auto flex flex-col sm:flex-wrap md:flex-row items-center sm:justify-between",
    },
  },
  formControls: {
    textInput: {
      addon:
        "inline-flex items-center border justify-center order-2 rounded-r-md bg-gray-200 border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:bg-gray-600 dark:text-gray-400",
      field: {
        input: {
          base: "block w-full border focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
          withAddon: {
            on: "rounded-l-lg",
            off: "rounded-lg",
          },
        },
      },
    },
  },
};

export const textContent = {
  brand: "RyUP",
  subTextBrand: "Universal Profile social recovery tool",
  common: {
    tooltipMsg: {
      threshold:
        "Minimum number of guardian votes needed for an address to recover the Universal Profile",
      guardians:
        "List of addresses that will act as guardians in the recovery process by voting for a new address.",
      secret:
        "Secret that is requested in the recovery process to the address that reaches the threshold of votes.",
      secretB: "The secret set at deployment or magnament.",
      votingId:
        "Should be a plain string or a hash (0x + 32 bytes hexadecimal string). It must be shared to the other guardians to participate in the same voting.",
      votingIdB:
        "Should be a plain string or a hash (0x + 32 bytes hexadecimal string).",
      votingAddress: "Candidate address to recover the Universal Profile",
      recoverProcessId:
        "Voting identifier that was shared with the guardians who voted for the candidate address to recover the Universal Profile.",
      newSecret:
        "New secret that will be requested in the event that there is another new Universal Profile recovery process.",
    },
  },
  homepage: {
    title: "RyUP - Universal Profile Social Recovery",
    valuePropose: {
      title: "Recover your Universal Profile",
      subtitle: "Deploy, manage, vote and recover on RyUP.",
    },
    actionsCards: [
      {
        title: "Deploy",
        description:
          "Implement a new contract with the LSP11 standard. It grants permissions and registers the address in the Universal Profile storage keys.",
        pathname: "/deploy",
      },
      {
        title: "Manage",
        description:
          "Manage the social recovery tool linking to the address of the Universal Profile. Add or remove guardians, change the secret or change the threshold.",
        pathname: "/manage",
      },
      {
        title: "Vote",
        description:
          "Vote a new candidate address to recover access to the Universal Profile. The caller has to be a guardian.",
        pathname: "/vote",
      },
      {
        title: "Recover",
        description:
          "Recover access to the Universal Profile. Caller must have reached the threshold of votes. Set a new secret for a new eventual recovery process.",
        pathname: "/recover",
      },
    ],
  },
  deploy: {
    title: "RyUP - Deploy",
  },
  manage: {
    title: "RyUP - Manage",
  },
  vote: {
    title: "RyUP - Vote",
  },
  recover: {
    title: "RyUP - Recover",
  },
};

export const supportedChains: { [key: string]: Chain } = {
  l16: {
    chainId: 2828,
    chainName: "Lukso L16",
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: "0x0000000000000000000000000000000000000000",
    getExplorerAddressLink: (address: string) =>
      `https://explorer.execution.l16.lukso.network/address/${address}`,
    getExplorerTransactionLink: (transactionHash: string) =>
      `https://explorer.execution.l16.lukso.network/tx/${transactionHash}`,
    // Optional parameters:
    rpcUrl: "https://rpc.l16.lukso.network/",
    blockExplorerUrl: "https://explorer.execution.l16.lukso.network/",
    nativeCurrency: {
      name: "LUKSO",
      symbol: "LYX",
      decimals: 18,
    },
  },
};
