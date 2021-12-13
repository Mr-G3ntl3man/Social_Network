import React from 'react';
import {LoginSpotify} from "./LoginSpotify";
import {Dashboard} from "./Dashboard";

const code = new URLSearchParams(window.location.search).get("code")

export const Music = () => {

   return (
      <>
         {code ? <Dashboard code={code}/> : <LoginSpotify/>}

      </>
   )
}