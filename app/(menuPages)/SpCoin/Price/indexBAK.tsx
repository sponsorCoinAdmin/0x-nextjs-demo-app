'use client'
import styles from '../styles/SpCoin.module.css'
import '../styles/SpCoin.module.css'
import spCoin_png from '../components/images/spCoin.png'
// import dataList from '../Resources/data/tokenEthList.json';
// import dataList from '../../../components/Dialogs/Resources/data/tokenEthList.json';
// import dataList from '../../../components/Dialogs/Resources/data/tokenPolyList.json';

type ListElement2 = {
  chainId: number;
  ticker: string;
  img: string;
  name: string;
  address: Address;
  decimals: number;
}

import jsonList from '../../../components/Dialogs/Resources/data/tokenPolyList.json';
import Dialog from '../../../components/Dialogs/Dialog';

import Image from 'next/image'
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";









///////////////////////////////////////////////////////////////////////////////////////////////////////////////
type ListElement = {
  chainId: number;
  ticker: string;
  img: string;
  name: string;
  address: Address;
  decimals: number;
}

let dataList: ListElement[] = [
  {
      "chainId": 1,
      "ticker": "USDC",
      "img": "https://cdn.moralis.io/eth/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
      "name": "USD Coin",
      "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "decimals": 6
  },
  {
      "chainId": 1,
      "ticker": "LINK",
      "img": "https://cdn.moralis.io/eth/0x514910771af9ca656af840dff83e8264ecf986ca.png",
      "name": "Chainlink",
      "address": "0x514910771af9ca656af840dff83e8264ecf986ca",
      "decimals": 18
  },
  {
      "chainId": 1,
      "ticker": "USDT",
      "img": "https://cdn.moralis.io/eth/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      "name": "Tether USD",
      "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "decimals": 6
  },
  {
      "chainId": 1,
      "ticker": "GUSD",
      "img": "https://cdn.moralis.io/eth/0x056fd409e1d7a124bd7017459dfea2f387b6d5cd.png",
      "name": "Gemini USD",
      "address": "0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd",
      "decimals": 2
  },
  {
      "chainId": 1,
      "ticker": "DAI",
      "img": "https://cdn.moralis.io/eth/0x6b175474e89094c44da98b954eedeac495271d0f.png",
      "name": "Dai Stablecoin",
      "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
      "decimals": 18
  },
  {
      "chainId": 1,
      "ticker": "WETH",
      "img": "https://cdn.moralis.io/eth/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
      "name": "Wrapped Ethereum",
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "decimals": 18
  },
  {
      "chainId": 1,
      "ticker": "WBTC",
      "img": "https://cdn.moralis.io/eth/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
      "name": "Wrapped Bitcoin",
      "address": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      "decimals": 8
  },
  {
      "chainId": 1,
      "ticker": "MATIC",
      "img": "https://cdn.moralis.io/eth/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
      "name": "Matic Token",
      "address": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
      "decimals": 18
  },
  {
      "chainId": 1,
      "ticker": "UNI",
      "img": "https://cdn.moralis.io/eth/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png",
      "name": "Uniswap",
      "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      "decimals": 18
  },
  {
      "chainId": 1,
      "ticker": "CRV",
      "img": "https://cdn.moralis.io/eth/0xd533a949740bb3306d119cc777fa900ba034cd52.png",
      "name": "Curve DAO Token",
      "address": "0xd533a949740bb3306d119cc777fa900ba034cd52",
      "decimals": 18
  },
  {
      "chainId": 1,
      "ticker": "MKR",
      "img": "https://cdn.moralis.io/eth/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2.png",
      "name": "Maker",
      "address": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
      "decimals": 18
  },
  {
      "chainId": 1,
      "ticker": "SHIB",
      "img": "https://cdn.moralis.io/eth/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce.png",
      "name": "Shiba Inu",
      "address": "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
      "decimals": 18
  },
  {
      "chainId": 1,
      "ticker": "AAVE",
      "img": "https://cdn.moralis.io/eth/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
      "name": "AAVE",
      "address": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      "decimals": 18
  },
  {
      "chainId": 1,
      "ticker": "SPCT_V001",
      "img": "https://cdn.moralis.io/eth/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
      "name": "Sponsor Coin",
      "address": "0x7d4e590f15E424Dd635822529a2b24D7Bc18935a",
      "decimals": 18
  }
]

///////////////////////////////////////////////////////////////////////////////////////////////////////////  










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

  const [sellListElement, setSellListElement] = useState<ListElement>(defaultSellToken);
  const [buyListElement, setBuyListElement] = useState<ListElement>(defaultBuyToken);

  console.log(sellAmount, sellListElement.decimals, "<-");
  const parsedSellAmount =
    sellAmount && tradeDirection === "sell"
      ? parseUnits(sellAmount, sellListElement.decimals).toString()
      : undefined;

  const parsedBuyAmount =
    buyAmount && tradeDirection === "buy"
      ? parseUnits(buyAmount, buyListElement.decimals).toString()
      : undefined;

  const { isLoading: isLoadingPrice } = useSWR(
    [
      "/api/price",
      {
        sellToken: sellListElement.address,
        buyToken: buyListElement.address,
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
          console.log(formatUnits(data.buyAmount, buyListElement.decimals), data);
          setBuyAmount(formatUnits(data.buyAmount, buyListElement.decimals));
        } else {
          setSellAmount(formatUnits(data.sellAmount, sellListElement.decimals));
        }
      },
    }
  );

  const { data, isError, isLoading } = useBalance({
    address: takerAddress,
    token: sellListElement.address,
  });

  console.log(sellAmount);

  const disabled =
    data && sellAmount
      ? parseUnits(sellAmount, sellListElement.decimals) > data.value
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

  function switchTokens() {
    let tmpElement: ListElement = sellListElement;
    setSellListElement(buyListElement);
    setBuyListElement(tmpElement);
  }

  async function onClose() {
      console.log("Modal has closed")
  }
// --------------------------- END NEW MODAL/DIALOG CODE -----------------------------------------------------

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
            
              sellTokenAddress={sellListElement.address}
              takerAddress={takerAddress}
              onClick={() => {
                setFinalize(true);
              }}
              disabled={disabled}
            />
            ) : (
          <CustomConnectButton />)}
         
          <div className={styles.switchButton} onClick={switchTokens}>
              <ArrowDownOutlined className={styles.switchArrow} />
          </div>
 
            {/* {tokenOne.ticker} */}
            <div className={styles.assetOne} onClick={() => openTokenModal(SELL)}>
            <img
              alt={sellListElement.name}
              className="h-9 w-9 mr-2 rounded-md"
              src={sellListElement.img}
            />
            {sellListElement.ticker}
            <DownOutlined />
          </div>

          <div className={styles.assetTwo} onClick={() => openTokenModal(BUY)}>
            <img
              alt={buyListElement.name}
              className="h-9 w-9 mr-2 rounded-md"
              src={buyListElement.img}
            />
            {buyListElement.ticker}
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
                  buyListElement.decimals
                )
              ) *
                AFFILIATE_FEE +
              " " +
              buyListElement.ticker
            : null}
        </div>
      </div>

      {isLoadingPrice && (
        <div className="text-center mt-2">Fetching the best price...</div>
      )}
    </form>
  );
}