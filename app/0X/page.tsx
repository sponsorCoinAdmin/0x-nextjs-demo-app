'use client'

import "@/styles/globals.css";
import Title from "./components/panes/title"

import ConnectedPage from "./components/ConnectWrapper";
import Component from './index';



import React from 'react'

function connectedPage() {
  return (
    <>
      {/* <Title address={undefined} isConnected={undefined} connect={undefined} headerType={''} /> */}
      <ConnectedPage Component={Title} />
      <ConnectedPage Component={Component} />
    </>
  )
}

export default connectedPage
