import React from 'react';
import {LoginSpotify} from "./LoginSpotify";
import {Dashboard} from "./Dashboard";
import {useSelector} from "react-redux";
import {AppRootStateT} from "../../redux/redux-store";
import {Preloader} from "../common/Preloader/Preloader";

const code = new URLSearchParams(window.location.search).get("code")

export const Music = () => {
   const isFetching = useSelector<AppRootStateT, boolean>(state => state.spotify.isFetching)

   return (
      <>
         {isFetching && <Preloader/>}

         {code ? <Dashboard code={code}/> : <LoginSpotify/>}
      </>
   )
}