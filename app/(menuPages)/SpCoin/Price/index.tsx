import SpCoinExchange from '../components/SpCoinExchange'
import styles from '../styles/SpCoin.module.css'
import spCoin_png from '../components/images/spCoin.png'
import Image from 'next/image'
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";




//-------------- Finish Moralis Requirements ----------------------------------

import ApproveOrReviewButton from '../components/Buttons/ApproveOrReviewButton';
import CustomConnectButton from '../components/Buttons/CustomConnectButton';
import ConnectApproveOrReviewButton from '../components/Buttons/ConnectApproveOrReviewButton';







import qs from "qs";
import useSWR from "swr";
import { ConnectKitButton } from "connectkit";
import { useState, ChangeEvent, SetStateAction } from "react";
import { formatUnits, parseUnits } from "ethers";
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
} from "../lib/constants";

interface PriceRequestParams {
  sellToken: string;
  buyToken: string;
  buyAmount?: string;
  sellAmount?: string;
  takerAddress?: string;
}

const AFFILIATE_FEE = 0.01; // Percentage of the buyAmount that should be attributed to feeRecipient as affiliate fees
const FEE_RECIPIENT = "0x75A94931B81d81C7a62b76DC0FcFAC77FbE1e917"; // The ETH address that should receive affiliate fees

export const fetcher = ([endpoint, params]: [string, PriceRequestParams]) => {
  const { sellAmount, buyAmount } = params;
  if (!sellAmount && !buyAmount) return;
  const query = qs.stringify(params);

  return fetch(`${endpoint}?${query}`).then((res) => res.json());
};

export default function PriceView({
  price,
  setPrice,
  setFinalize,
  takerAddress,
}: {
  price: any;
  setPrice: (price: any) => void;
  setFinalize: (finalize: boolean) => void;
  takerAddress: Address | undefined;
}) {
  // fetch price here
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [tradeDirection, setTradeDirection] = useState("sell");
  const [sellToken, setSellToken] = useState("wmatic");
  const [buyToken, setBuyToken] = useState("dai");

  const handleSellTokenChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSellToken(e.target.value);
  };

  function handleBuyTokenChange(e: ChangeEvent<HTMLSelectElement>) {
    setBuyToken(e.target.value);
  }

  const sellTokenDecimals = POLYGON_TOKENS_BY_SYMBOL[sellToken].decimals;

  console.log(sellAmount, sellTokenDecimals, "<-");
  const parsedSellAmount =
    sellAmount && tradeDirection === "sell"
      ? parseUnits(sellAmount, sellTokenDecimals).toString()
      : undefined;

  const buyTokenDecimals = POLYGON_TOKENS_BY_SYMBOL[buyToken].decimals;

  const parsedBuyAmount =
    buyAmount && tradeDirection === "buy"
      ? parseUnits(buyAmount, buyTokenDecimals).toString()
      : undefined;

  const { isLoading: isLoadingPrice } = useSWR(
    [
      "/api/price",
      {
        sellToken: POLYGON_TOKENS_BY_SYMBOL[sellToken].address,
        buyToken: POLYGON_TOKENS_BY_SYMBOL[buyToken].address,
        sellAmount: parsedSellAmount,
        buyAmount: parsedBuyAmount,
        takerAddress,
        feeRecipient: FEE_RECIPIENT,
        buyTokenPercentageFee: AFFILIATE_FEE,
      },
    ],
    fetcher,
    {
      onSuccess: (data) => {
        setPrice(data);
        if (tradeDirection === "sell") {
          console.log(formatUnits(data.buyAmount, buyTokenDecimals), data);
          setBuyAmount(formatUnits(data.buyAmount, buyTokenDecimals));
        } else {
          setSellAmount(formatUnits(data.sellAmount, sellTokenDecimals));
        }
      },
    }
  );

  const { data, isError, isLoading } = useBalance({
    address: takerAddress,
    token: POLYGON_TOKENS_BY_SYMBOL[sellToken].address,
  });

  console.log(sellAmount);

  const disabled =
    data && sellAmount
      ? parseUnits(sellAmount, sellTokenDecimals) > data.value
      : true;

  console.log(data, isError, isLoading);







  // ------------------------------ START NEW MORALIS SCRIPT CODE

    let [slippage, setSlippage] = useState(2.5);
  function handleSlippageChange(e: { target: { value: SetStateAction<number>; }; }) {
    setSlippage(e.target.value);
  }

  const settings = (
    <div>
      <div >Slippage Tolerance</div>
      <div >
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );

let [changeToken, setChangeToken] = useState(1);
let [isOpen, setIsOpen] = useState(false);

function openModal(asset: SetStateAction<number>) {
  setChangeToken(asset);
  setIsOpen(true);
}



  // ------------------------------ END NEW MORALIS SCRIPT CODE


  return (
    <form>

      {/* <SpCoinExchange /> */}
      {/* <h1>-----------------------------------------------------------------</h1> */}
      {/* className={styles.tradeBox} */}
      {/* <div className="bg-blue-800 dark:bg-slate-800 p-4 rounded-xl mb-3"> */}
      <div className={styles.tradeBox}>
        <div className={styles.tradeBoxHeader}>
          <Image src={spCoin_png} width={30} height={30} alt="Moralis Logo" />
          <h4 className={styles.center}>Sponsor Coin Exchange</h4>
          <Popover
            content={settings}
            title="Settings"
            trigger="click"
            placement="bottomLeft"
          >
          <SettingOutlined className={styles.cog} />
          </Popover>
        </div>
        {/* 
          <Input className={styles.antInput} placeholder="0" value={tokenOneAmount} onChange={changeAmount} disabled={!prices} />
          <Input className={styles.antInput} placeholder="0" value={tokenTwoAmount} disabled={true} />
          <div className={styles.swapButton} disabled={!tokenOneAmount || !isConnected} onClick={fetchDexSwap}>Swap</div>
        */}
        <div className={styles.inputs}>
          <Input id="sell-amount" className={styles.antInput} placeholder="0" disabled={false} 
            onChange={(e) => {
                setTradeDirection("sell");
                setSellAmount(e.target.value);
            }}/>
          <Input id="buy-amount" className={styles.antInput} placeholder="0" disabled={true} value={parseFloat(buyAmount).toFixed(6)} />
          {takerAddress ? (
            <ApproveOrReviewButton
              sellTokenAddress={POLYGON_TOKENS_BY_SYMBOL[sellToken].address}
              takerAddress={takerAddress}
              onClick={() => {
                setFinalize(true);
              }}
              disabled={disabled}
            />
            ) : (
          <CustomConnectButton />)}
         
          <div className={styles.switchButton} >
              <ArrowDownOutlined className={styles.switchArrow} />
          </div>
 
          <div className={styles.assetOne} onClick={() => openModal(1)}>
            <img
              alt={sellToken}
              className="h-9 w-9 mr-2 rounded-md"
              src={POLYGON_TOKENS_BY_SYMBOL[sellToken].logoURI}
            />
            {sellToken.toUpperCase()}
            {/* {tokenOne.ticker} */}
            <DownOutlined />
          </div>

          <div className={styles.assetTwo} onClick={() => openModal(1)}>
            <img
              alt={buyToken}
              className="h-9 w-9 mr-2 rounded-md"
              src={POLYGON_TOKENS_BY_SYMBOL[buyToken].logoURI}
            />
            {buyToken.toUpperCase()}
            {/* {tokenOne.ticker} */}
            <DownOutlined />
          </div>

        </div>















        <section className="mt-4 flex items-start justify-center">
          <label htmlFor="sell-select" className="sr-only"></label>
          <img
            alt={sellToken}
            className="h-9 w-9 mr-2 rounded-md"
            src={POLYGON_TOKENS_BY_SYMBOL[sellToken].logoURI}
          />
          <div className="h-14 sm:w-full sm:mr-2">
            <select
              value={sellToken}
              name="sell-token-select"
              id="sell-token-select"
              className="mr-2 w-50 sm:w-full h-19 rounded-md  text-black"
              onChange={handleSellTokenChange}
            >
              <option value="">--Choose a token--</option>
              {POLYGON_TOKENS.map((token) => {
                return (
                  <option
                    key={token.address}
                    value={token.symbol.toLowerCase()}
                  >
                    {token.symbol}
                  </option>
                );
              })}
            </select>
          </div>
          <label htmlFor="sell-amount" className="sr-only"></label>
          <input
            id="sell-amount"
            value={sellAmount}
            className="h-9 rounded-md
            text-black"
            style={{ border: "1px solid black" }}
            onChange={(e) => {
              setTradeDirection("sell");
              setSellAmount(e.target.value);
            }}
          />
        </section>
        <section className="flex mb-6 mt-4 items-start justify-center">
          <label htmlFor="buy-token" className="sr-only"></label>
          <img
            alt={buyToken}
            className="h-9 w-9 mr-2 rounded-md"
            src={POLYGON_TOKENS_BY_SYMBOL[buyToken].logoURI}
          />
          <select
            name="buy-token-select"
            id="buy-token-select"
            value={buyToken}
            className="mr-2 w-50 sm:w-full h-9 rounded-md  text-black"
            onChange={(e) => handleBuyTokenChange(e)}
          >
            <option value="">--Choose a token--</option>
            {POLYGON_TOKENS.map((token) => {
              return (
                <option key={token.address} value={token.symbol.toLowerCase()}>
                  {token.symbol}
                </option>
              );
            })}
          </select>
          <label htmlFor="buy-amount" className="sr-only"></label>
          <input
            id="buy-amount"
            value={buyAmount}
            className="h-9 rounded-md bg-white cursor-not-allowed text-black"
            style={{ border: "1px solid black" }}
            disabled
            onChange={(e) => {
              setTradeDirection("buy");
              setBuyAmount(e.target.value);
            }}
          />
        </section>
        <div className="text-slate-400">
          {price && price.grossBuyAmount
            ? "Affiliate Fee: " +
              Number(
                formatUnits(
                  BigInt(price.grossBuyAmount),
                  POLYGON_TOKENS_BY_SYMBOL[buyToken].decimals
                )
              ) *
                AFFILIATE_FEE +
              " " +
              POLYGON_TOKENS_BY_SYMBOL[buyToken].symbol
            : null}
        </div>
      </div>

      {isLoadingPrice && (
        <div className="text-center mt-2">Fetching the best price...</div>
      )}
    </form>
  );
}
