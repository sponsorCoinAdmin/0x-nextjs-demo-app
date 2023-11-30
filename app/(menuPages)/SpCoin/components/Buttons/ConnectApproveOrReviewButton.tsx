import React from 'react'
import ApproveOrReviewButton from './ApproveOrReviewButton';
import CustomConnectButton from './CustomConnectButton';

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


function ConnectApproveOrReviewButton({
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
  return (
    <div>
      {takerAddress ? (
        <ApproveOrReviewButton
          sellTokenAddress={sellTokenAddress}
          takerAddress={takerAddress}
          onClick={onClick}
          disabled={disabled}
        />
        ) : (
        <CustomConnectButton />)}
    </div>
  )
}

export default ConnectApproveOrReviewButton
