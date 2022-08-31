/* eslint-disable no-unused-vars */
import { useEthers } from "@usedapp/core";
import { Label, TextInput } from "flowbite-react";
import Head from "next/head";
import { useCallback, useEffect, useMemo } from "react";
import { RecoverOwnershipParams } from "ryup-social-recovery-tool";
import ActionButton from "../components/Common/ActionButton";
import ActionCard from "../components/Common/ActionCard";
import InfoTooltip from "../components/Common/InfoTooltip";
import PasswordInput from "../components/Common/PasswordInput";
import UniversalProfileAddressLabel from "../components/Common/UniversalProfileAddressLabel";
import { textContent } from "../constants";
import { useBSR } from "../contexts/BasicSocialRecovery";
import { useError } from "../contexts/Error";
import { useSuccess } from "../contexts/Success";
import useList from "../hooks/useList";
import useLoading from "../hooks/useLoading";
import useTextInput from "../hooks/useTextInput";
import { InputEvent } from "../interfaces";
import handleError from "../utils/handle-error";
import ifIsPlainHash from "../utils/hash-if-plain";
import toKeccak256 from "../utils/to-keccak256";

interface Vote {
  guardian: string;
  candidate: string;
}

interface VotingIdWithVote {
  votingId: string;
  votes: Vote[];
}

export default function Recover() {
  const { bsr, handleChangeUpAddress, upAddress, upAddressInputError } =
    useBSR();
  const { account } = useEthers();

  const { setEthersError } = useError();
  const { setEthersSuccess } = useSuccess();
  const {
    list: votingIdsWithVotes,
    addItem: addVotingIdWithVote,
    clear: clearVotingIdsWithVoteList,
  } = useList<VotingIdWithVote>();

  const {
    inputValue: votingIdInputValue,
    setInputValue: setVotingIdInputValue,
  } = useTextInput();
  const { inputValue: secretInputValue, setInputValue: setSecretInputValue } =
    useTextInput();
  const {
    inputValue: newSecretInputValue,
    setInputValue: setNewSecretInputValue,
  } = useTextInput();

  const { isLoading, startLoad, stopLoad } = useLoading();

  useEffect(() => {
    clearVotingIdsWithVoteList();
    if (!bsr) return;
    const getRecoveryData = async () => {
      const guardians = await bsr.getGuardians();
      const recoverProcessesIds = await bsr.getRecoverProcessesIds();
      return { guardians, recoverProcessesIds };
    };

    getRecoveryData()
      .then(({ guardians, recoverProcessesIds }) => {
        for (const votingId of recoverProcessesIds) {
          let votes: Vote[] = [];
          for (const guardian of guardians) {
            bsr.getGuardianVote(votingId, guardian).then((candidate) => {
              votes.push({ guardian, candidate });
            });
          }
          addVotingIdWithVote({ votingId, votes });
        }
        console.log(votingIdsWithVotes);
      })
      .catch((e) => {
        handleError(e, setEthersError);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bsr]);

  useEffect(() => {
    console.log(votingIdsWithVotes);
  }, [votingIdsWithVotes]);

  const handleChangeVotingIdInputValue = (e: InputEvent) => {
    if (!e.target.value) {
      setVotingIdInputValue("");
      return;
    }
    setVotingIdInputValue(e.target.value);
  };
  const handleChangeSecretInputValue = (e: InputEvent) => {
    if (!e.target.value) {
      setSecretInputValue("");
      return;
    }
    setSecretInputValue(e.target.value);
  };
  const handleChangeNewSecretInputValue = (e: InputEvent) => {
    if (!e.target.value) {
      setNewSecretInputValue("");
      return;
    }
    setNewSecretInputValue(e.target.value);
  };

  const recover = useCallback(async () => {
    if (!bsr) return;

    const params: RecoverOwnershipParams = {
      recoverProcessId: ifIsPlainHash(votingIdInputValue),
      secret: secretInputValue,
      newSecret: toKeccak256(newSecretInputValue),
    };
    return await bsr.recoverOwnership(params);
  }, [bsr, newSecretInputValue, secretInputValue, votingIdInputValue]);

  const handleClickRecover = () => {
    startLoad();
    recover()
      .then((receipt) => {
        console.log(receipt);
        stopLoad();
        setVotingIdInputValue("");
        setSecretInputValue("");
        setNewSecretInputValue("");
        setEthersSuccess("recoverOwnership executed succesfully");
      })
      .catch((e) => {
        handleError(e, setEthersError);
        stopLoad();
      });
  };

  const isReadyRecover = useMemo(() => {
    return !!(
      account &&
      upAddress !== "" &&
      !upAddressInputError &&
      votingIdInputValue !== "" &&
      secretInputValue !== "" &&
      newSecretInputValue !== ""
    );
  }, [
    account,
    newSecretInputValue,
    secretInputValue,
    upAddress,
    upAddressInputError,
    votingIdInputValue,
  ]);

  return (
    <>
      <Head>
        <title>{textContent.recover.title}</title>
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
          <ActionCard title="Recover Ownership" height="h-96">
            <div className="flex h-4/5 w-full flex-col justify-between">
              <Label>
                <InfoTooltip msg={textContent.common.tooltipMsg.votingIdB} />
                <p className="mb-1 inline-flex align-middle">VotingID:</p>
                <TextInput
                  value={votingIdInputValue}
                  onChange={handleChangeVotingIdInputValue}
                />
              </Label>
              <Label>
                <InfoTooltip msg={textContent.common.tooltipMsg.secretB} />
                <p className="mb-1 inline-flex align-middle">Secret:</p>
                <TextInput
                  value={secretInputValue}
                  onChange={handleChangeSecretInputValue}
                />
              </Label>
              <PasswordInput
                label="New Secret:"
                inputValue={newSecretInputValue}
                handleChangeInputValue={handleChangeNewSecretInputValue}
                tooltipMsg={textContent.common.tooltipMsg.newSecret}
              />
              <div className="self-center">
                <ActionButton
                  label="Recover"
                  disabled={!isReadyRecover}
                  isLoading={isLoading}
                  onClick={handleClickRecover}
                />
              </div>
            </div>
          </ActionCard>
        </div>
      </div>
    </>
  );
}
