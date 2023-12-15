'use client'
import  React, { ReactNode, useRef, useEffect, useState} from 'react'
import '../Styles/Modal.module.css';
import dataList from '../Resources/data/tokenEthList.json';
import Dialog from '../RecipientDlgLst';

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

const dialogName ='Sponsor a recipient';
const selectPlacement ='Search recipient Name or paste Address';
  
// Parent component
function DlgLstBtn({ selectedListElement, onClose }: Props) {

  return (
    <>
      <Dialog titleName={dialogName} selectPlacement={selectPlacement} dataList={dataList} onClose={onClose} selectedListElement={selectedListElement} />

      <div className="ModalButton">
        <button
          className="bluBtn"
          onClick={() => {
              const dialog = document.querySelector("#RecipientDialogList")
                dialog?.show()
          }}
        >
        Recipient List
        </button>
      </div>
    </>
  )
}

export default DlgLstBtn
