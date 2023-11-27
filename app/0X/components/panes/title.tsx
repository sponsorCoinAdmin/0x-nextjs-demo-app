import React from 'react'
import MoralisHeader from './0XHeader';

function Header(props: { address: any; isConnected: any; connect: any; headerType: string}) {
  const {address, isConnected, connect, headerType} = props;
  let header = MoralisHeader(address, isConnected, connect);
  // let header = TestHeader(address, isConnected, connect);

  return (
    <header>
      {header}
    </header>
  );
}

export default Header;
