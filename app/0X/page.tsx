'use client'

import "@/styles/globals.css";
import Title from "./components/panes/title"

import ConnectedPage from "../components/ConnectWrapper";
import Component from './index';

import React from 'react'

function connectedPage() {
  return (
    <>
       <ConnectedPage Component={Component} />
    </>
  )
}

export default connectedPage
