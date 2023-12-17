"use client"
import './Styles/modal.css';
import { useRef } from 'react'
import DataList from './DataList'
import InputSelect from './InputSelect'

type ListElement = {
    chainId: number;
    ticker: string; 
    img: string; 
    name: string; 
    address: string; 
    decimals: number;
}

type Props = {
    titleName: any,
    selectPlacement: string,
    dataList: ListElement[],
    onClose:  () => void,
    getDlgLstElement: (listElement: ListElement) => void,
}

export default function Dialog({ titleName, selectPlacement, dataList, onClose, getDlgLstElement}: Props) {

    const dialogRef = useRef<null | HTMLDialogElement>(null)

    const getSelectedListElement = (listElement: ListElement) => {
        getDlgLstElement(listElement);
        closeDialog()
      }

    const closeDialog = () => {
        dialogRef.current?.close()
        onClose()
    }

    const dialog = (
        <dialog id="dialogList" ref={dialogRef} className="modalContainer">
            <div className="flex flex-row justify-between mb-1 pt-0 px-3 text-gray-600">
                <h1 className="text-sm indent-9 mt-1">{titleName}</h1>
                <div className="cursor-pointer rounded border-none w-5 text-xl text-white"
                    onClick={closeDialog}
                >X</div>
            </div>

            <div className="modalBox">
                <div className="modalInputSelect">
                    <InputSelect selectPlacement={selectPlacement}/>
                </div>
                <div className="modalScrollBar">
                    <DataList dataList={dataList} selectPlacement={selectPlacement} getSelectedListElement={getSelectedListElement}/>
                </div>
            </div>
        </dialog>
    )
    return dialog
}
