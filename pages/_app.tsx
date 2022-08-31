import { Config, DAppProvider } from "@usedapp/core";
import { Spinner } from "flowbite-react";
import { AppProps } from "next/app";
import { FC, Suspense } from "react";
import Layout from "../components/Layout";
import { supportedChains } from "../constants";
import { BasicSocialRecoveryProvider } from "../contexts/BasicSocialRecovery";
import { ErrorProvider } from "../contexts/Error";
import { SuccessProvider } from "../contexts/Success";
import "../styles/globals.css";

const config: Config = {
  readOnlyChainId: supportedChains["l16"]?.chainId,
  readOnlyUrls: {
    [2828]: "https://rpc.l16.lukso.network/",
  },
  networks: [supportedChains["l16"]!],
};

const App: FC<AppProps> = function ({ Component, pageProps }): JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Spinner size="lg" /> Loading..
        </div>
      }
    >
      <DAppProvider config={config}>
        <ErrorProvider>
          <SuccessProvider>
            <BasicSocialRecoveryProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </BasicSocialRecoveryProvider>
          </SuccessProvider>
        </ErrorProvider>
      </DAppProvider>
    </Suspense>
  );
};

export default App;
