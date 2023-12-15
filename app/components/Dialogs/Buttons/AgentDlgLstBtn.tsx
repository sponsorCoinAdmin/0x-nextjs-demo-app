'use client'
import '../Styles/modal.css';
import dataList from '../Resources/data/tokenEthList.json';
import Dialog from '../AgentDlgLst';

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

const dialogName ='Select an agent';
const selectPlacement ='Search agent name or paste address';

// Parent component
function DlgLstBtn({ selectedListElement, onClose }: Props) {

  return (
    <>
      <Dialog titleName={dialogName} selectPlacement={selectPlacement} dataList={dataList} onClose={onClose} selectedListElement={selectedListElement}/>

      <div className="ModalButton">
        <button
          className="bluBtn"
          onClick={() => {
              const dialog = document.querySelector("#AgentDialogList")
              dialog?.show()
          }}
        >
          Agent List
        </button>
      </div>
    </>
  )
}

export default DlgLstBtn
