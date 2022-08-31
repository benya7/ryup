import { Flowbite } from "flowbite-react";
import { ReactNode } from "react";
import { flowbiteTheme as theme } from "../../constants";
import { useError } from "../../contexts/Error";
import { useSuccess } from "../../contexts/Success";
import Error from "./Error";
import FooterComponent from "./Footer";
import Header from "./Header";
import Success from "./Success";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { ethersError, setEthersError } = useError();
  const { ethersSuccess, setEthersSuccess } = useSuccess();

  const handleOnCloseError = () => setEthersError(undefined);
  const handleOnCloseSuccess = () => setEthersSuccess(undefined);
  return (
    <Flowbite theme={{ theme }}>
      <div className="absolute z-30">
        {ethersError && (
          <Error message={ethersError.message} onClose={handleOnCloseError} />
        )}
        {ethersSuccess && (
          <Success message={ethersSuccess} onClose={handleOnCloseSuccess} />
        )}
      </div>
      <Header />
      <div className="flex min-h-screen dark:bg-gray-900">
        <main className="order-2 mx-8 mt-4 mb-24 flex-[1_0_16rem]">
          {children}
        </main>
      </div>
      <div className="border-t dark:bg-gray-900">
        <FooterComponent />
      </div>
    </Flowbite>
  );
}
