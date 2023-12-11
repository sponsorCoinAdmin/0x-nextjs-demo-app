import React from 'react'
import styles from '../../styles/SpCoin.module.css'

import {
    erc20ABI,
    useContractRead,
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useBalance,
    type Address,
  } from "wagmi";
  import {
    POLYGON_TOKENS,
    POLYGON_TOKENS_BY_SYMBOL,
    POLYGON_TOKENS_BY_ADDRESS,
    MAX_ALLOWANCE,
    exchangeProxy,
  } from "../../lib/constants";

function ApproveOrReviewButton({
    takerAddress,
    onClick,
    sellTokenAddress,
    disabled,
  }: {
    takerAddress: Address;
    onClick: () => void;
    sellTokenAddress: Address;
    disabled?: boolean;
  }) {
    // 1. Read from erc20, does spender (0x Exchange Proxy) have allowance?
    const { data: allowance, refetch } = useContractRead({
      address: sellTokenAddress,
      abi: erc20ABI,
      functionName: "allowance",
      args: [takerAddress, exchangeProxy],
    });
  
    // 2. (only if no allowance): write to erc20, approve 0x Exchange Proxy to spend max integer
    const { config } = usePrepareContractWrite({
      address: sellTokenAddress,
      abi: erc20ABI,
      functionName: "approve",
      args: [exchangeProxy, MAX_ALLOWANCE],
    });
  
    const {
      data: writeContractResult,
      writeAsync: approveAsync,
      error,
    } = useContractWrite(config);
  
    const { isLoading: isApproving } = useWaitForTransaction({
      hash: writeContractResult ? writeContractResult.hash : undefined,
      onSuccess(data) {
        refetch();
      },
    });
  
    if (error) {
      return <div>Something went wrong: {error.message}</div>;
    }
  
    if (allowance === 0n && approveAsync) {
      return (
        <>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={async () => {
              const writtenValue = await approveAsync();
            }}
          >
            {isApproving ? "Approving…" : "Approve"}
          </button>
        </>
      );
    }
  
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-25"
        className={styles.swapButton}
      >
        {disabled ? "Insufficient Balance" : "Review Trade"}
      </button>
    );
  }

export default ApproveOrReviewButton
