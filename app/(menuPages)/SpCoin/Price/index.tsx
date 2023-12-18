'use client'
import styles from '../styles/SpCoin.module.css'
import '../styles/SpCoin.module.css'
import spCoin_png from '../components/images/spCoin.png'
// import dataList from '../Resources/data/tokenEthList.json';
// import dataList from '../../../components/Dialogs/Resources/data/tokenEthList.json';
import dataList from '../../../components/Dialogs/Resources/data/tokenPolyList.json';
import Dialog from '../../../components/Dialogs/Dialog';

import Image from 'next/image'
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";

type ListElement = {
  chainId: number;
  ticker: string;
  img: string;
  name: string;
  address: string;
  decimals: number;
}

const defaultSellToken: ListElement = { 
  chainId: 137,
  ticker: "WBTC",
  img: "https://cdn.moralis.io/eth/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
  name: "Wrapped Bitcoin",
  address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
  decimals: 8
 };

 const defaultBuyToken: ListElement = { 
  chainId: 137,
  ticker: "USDC",
  img: "https://cdn.moralis.io/eth/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
  name: "USD Coin",
  address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  decimals: 6
};


//-------------- Finish Moralis Requirements ----------------------------------

import ApproveOrReviewButton from '../components/Buttons/ApproveOrReviewButton';
import CustomConnectButton from '../components/Buttons/CustomConnectButton';






import qs from "qs";
import useSWR from "swr";
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

const dialogName ='Select an agent';
const selectElement ='Search agent name or paste address';

const AFFILIATE_FEE = 0.01; // Percentage of the buyAmount that should be attributed to feeRecipient as affiliate fees
const FEE_RECIPIENT = "0x75A94931B81d81C7a62b76DC0FcFAC77FbE1e917"; // The ETH address that should receive affiliate fees

export const fetcher = ([endpoint, params]: [string, PriceRequestParams]) => {
  const { sellAmount, buyAmount } = params;
  if (!sellAmount && !buyAmount) return;
  const query = qs.stringify(params);

  // alert("fetcher([endpoint = " + endpoint + ",\nparams = " + JSON.stringify(params,null,2) + "]")
  console.log("fetcher([endpoint = " + endpoint + ",\nparams = " + JSON.stringify(params,null,2) + "]")

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



  const [sellListElement, setSellListElement] = useState<ListElement>(defaultSellToken);
  const [buyListElement, setBuyListElement] = useState<ListElement>(defaultBuyToken);



  const handleSellTokenChange = (e: ChangeEvent<HTMLSelectElement>) => {
    alert("handleSellTokenChange = " + e.target.value)
    setSellToken(e.target.value);
  };

  function handleBuyTokenChange(e: ChangeEvent<HTMLSelectElement>) {
    alert("e.target.value = "+JSON.stringify(e.target.value,null,2))
    setBuyToken(e.target.value);
  }

  // const sellTokenDecimals = POLYGON_TOKENS_BY_SYMBOL[sellToken].decimals;?
  const sellTokenDecimals = 18; // ToDo FIX This

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

  // const { isLoading: isLoadingPrice } = useSWR(
  //   [
  //     "/api/price",
  //     {
  //       sellToken: POLYGON_TOKENS_BY_SYMBOL[sellToken].address,
  //       buyToken: POLYGON_TOKENS_BY_SYMBOL[buyToken].address,
  //       sellAmount: parsedSellAmount,
  //       buyAmount: parsedBuyAmount,
  //       takerAddress,
  //       feeRecipient: FEE_RECIPIENT,
  //       buyTokenPercentageFee: AFFILIATE_FEE,
  //     },
  //   ],
  //   fetcher,
  //   {
  //     onSuccess: (data) => {
  //       setPrice(data);
  //       if (tradeDirection === "sell") {
  //         console.log(formatUnits(data.buyAmount, buyTokenDecimals), data);
  //         setBuyAmount(formatUnits(data.buyAmount, buyTokenDecimals));
  //       } else {
  //         setSellAmount(formatUnits(data.sellAmount, sellTokenDecimals));
  //       }
  //     },
  //   }
  // );

  const { isLoading: isLoadingPrice } = useSWR(
    [
      "/api/price",
      {
        // sellToken: POLYGON_TOKENS_BY_SYMBOL[sellToken].address,
        sellToken: sellListElement.address,
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



  // ------------------------------ START MORALIS SCRIPT CODE

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

  // ------------------------------ END MORALIS SCRIPT CODE ------------------------------------------------------

  // --------------------------- START NEW MODAL/DIALOG CODE -----------------------------------------------------
  
  const BUY = true;
  const SELL = false;
  let ACTION = SELL; 

  function openTokenModal(action: boolean) {
    ACTION = action;
    const dialog = document.querySelector("#dialogList")

    dialog?.showModal();
  }

  
  const getDlgLstElement = (_listElement: ListElement) => {
    if (ACTION === SELL)
      setSellListElement(_listElement);
    else
      setBuyListElement(_listElement);

    console.log("index.tsx:: Modifying Token Object " + JSON.stringify(_listElement,null,2));
  }

  async function onClose() {
      console.log("Modal has closed")
  }
// --------------------------- END NEW MODAL/DIALOG CODE

  return (
    <form>
      <Dialog titleName={dialogName} selectElement={selectElement} dataList={dataList} onClose={onClose} getDlgLstElement={getDlgLstElement}/>

      {/* <SpCoinExchange /> */}

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
 
            {/* {tokenOne.ticker} */}
            <div className={styles.assetOne} onClick={() => openTokenModal(SELL)}>
            <img
              alt={sellToken}
              className="h-9 w-9 mr-2 rounded-md"
              src={sellListElement.img}
            />
            {sellListElement.ticker}
            {/* {sellToken.toUpperCase()} */}
            <DownOutlined />
          </div>

          <div className={styles.assetTwo} onClick={() => openTokenModal(BUY)}>
            <img
              alt={buyToken}
              className="h-9 w-9 mr-2 rounded-md"
              src={buyListElement.img}
            />
            {buyListElement.ticker}
            {/* {buyToken.toUpperCase()} */}
            {/* {tokenOne.ticker} */}
            <DownOutlined />
          </div>
        </div>

{/* OX Code */}

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