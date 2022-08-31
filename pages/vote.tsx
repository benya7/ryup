import { useEthers } from "@usedapp/core";
import { isAddress } from "ethers/lib/utils";
import { Label, TextInput } from "flowbite-react";
import { useCallback, useEffect, useMemo } from "react";
import ActionButton from "../components/Common/ActionButton";
import ActionCard from "../components/Common/ActionCard";
import InfoTooltip from "../components/Common/InfoTooltip";
import LabelError from "../components/Common/LabelError";
import UniversalProfileAddressLabel from "../components/Common/UniversalProfileAddressLabel";
import { textContent } from "../constants";
import { useBSR } from "../contexts/BasicSocialRecovery";
import { useError } from "../contexts/Error";
import { useSuccess } from "../contexts/Success";
import useLoading from "../hooks/useLoading";
import useTextInput from "../hooks/useTextInput";
import { InputEvent } from "../interfaces";
import handleError from "../utils/handle-error";
import ifIsPlainHash from "../utils/hash-if-plain";

export default function Vote() {
  const { bsr, upAddress, upAddressInputError, handleChangeUpAddress } =
    useBSR();
  const { account } = useEthers();
  const { setEthersError } = useError();
  const { setEthersSuccess } = useSuccess();

  const {
    inputValue: newAddressInputValue,
    inputError: newAddressInputError,
    setInputValue: setNewAddressInputValue,
    setInputError: setNewAddressInputError,
  } = useTextInput();

  const {
    inputValue: votingIdInputValue,
    setInputValue: setVotingIdInputValue,
  } = useTextInput();

  const { isLoading, startLoad, stopLoad } = useLoading();

  const handleChangeVotingIdInputValue = (e: InputEvent) => {
    if (!e.target.value) {
      setVotingIdInputValue("");
      return;
    }
    setVotingIdInputValue(e.target.value);
  };

  const handleChangeNewAddressInputValue = (e: InputEvent) => {
    setNewAddressInputError(undefined);
    if (!e.target.value) {
      setNewAddressInputValue("");
      return;
    }
    if (!isAddress(e.target.value)) {
      setNewAddressInputError("Address is not a valid address");
    }
    if (e.target.value === upAddress) {
      setNewAddressInputError("Address can't be Universal Profile Address");
    }
    setNewAddressInputValue(e.target.value);
  };

  const vote = useCallback(async () => {
    if (!bsr) return;
    const receipt = bsr.voteToRecover({
      recoverProcessId: ifIsPlainHash(votingIdInputValue),
      address: newAddressInputValue,
    });
    return receipt;
  }, [bsr, votingIdInputValue, newAddressInputValue]);

  const handleClickVote = () => {
    startLoad();
    vote()
      .then((_receipt) => {
        console.log(_receipt);
        stopLoad();
        setNewAddressInputValue("");
        setVotingIdInputValue("");
        setEthersSuccess("voteToRecover executed successfully");
      })
      .catch((e) => {
        handleError(e, setEthersError);
        stopLoad();
      });
  };

  const isReadyVote = useMemo(() => {
    return !!(
      account &&
      upAddress !== "" &&
      !upAddressInputError &&
      votingIdInputValue !== "" &&
      newAddressInputValue !== "" &&
      !newAddressInputError
    );
  }, [
    account,
    votingIdInputValue,
    newAddressInputError,
    newAddressInputValue,
    upAddress,
    upAddressInputError,
  ]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  return (
  	<>
      <Head>
        <title>{textContent.vote.title}</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="w-full">
      <div className="mx-auto my-4 w-full sm:w-96">
        <UniversalProfileAddressLabel
          address={upAddress}
          handleChangeInput={handleChangeUpAddress}
          error={upAddressInputError}
        />
      </div>
      <div className="flex flex-wrap items-center justify-evenly">
        <ActionCard title="Vote New Address">
          <div className="flex h-3/4 w-full flex-col justify-between">
            <Label>
              <InfoTooltip msg={textContent.common.tooltipMsg.votingId} />
              <p className="mb-1 inline-flex align-middle">Voting ID:</p>
              <TextInput
                value={votingIdInputValue}
                onChange={handleChangeVotingIdInputValue}
              />
            </Label>
            <Label>
              <InfoTooltip msg={textContent.common.tooltipMsg.votingAddress} />
              <p className="mb-1 inline-flex align-middle">Address:</p>
              <TextInput
                value={newAddressInputValue}
                onChange={handleChangeNewAddressInputValue}
              />
              {newAddressInputError && (
                <LabelError label={newAddressInputError} />
              )}
            </Label>
            <div className="self-center">
              <ActionButton
                label="Vote"
                disabled={!isReadyVote}
                isLoading={isLoading}
                onClick={handleClickVote}
              />
            </div>
          </div>
        </ActionCard>
      </div>
    </div>
    </>
  );
}
