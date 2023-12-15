'use client'
import  React, { ReactNode, useRef, useEffect, useState} from 'react'
import '../Styles/modal.css';
import dataList from '../Resources/data/tokenEthList.json';
import Dialog from '../Dialog';

type ListElement = {
  ticker: string;
  img: string;
  name: string;
  address: string;
  decimals: number;
}

type Props = {
  selectedListElement: (listElement: ListElement) => void,
  onClose:  () => void,
}

const dialogName ='Select a token';
const selectPlacement ='Search token name or paste address'; 

// Parent component
function DlgLstBtn({ selectedListElement, onClose }: Props) {

  return (
    <>
      <Dialog titleName={dialogName} selectPlacement={selectPlacement} dataList={dataList} onClose={onClose} selectedListElement={selectedListElement}/>

      <div className="ModalButton">
        <button
          className="bluBtn"
          onClick={() => {
              const dialog = document.querySelector("#dialogList")
                dialog?.show()
          }}
        >
        Token List
        </button>
      </div>
    </>
  )
}

export default DlgLstBtn
