import React from 'react';
import {NeonBtn} from "../common/NeonBtn/NeonBtn";
import s from './music.module.scss'
import logo from '../../image/SpotifyIcon.svg'
import {AUTH_URL} from "../../api/spotify-api";

export const LoginSpotify: React.FC = () => {
   return (
      <div className={s.container}>
         <h2> Music from <span><img src={logo} alt="spotifyLogo"/></span></h2>

         <p>
            Yo! You can listen to music from Spotify. To do this, you need to log in!
         </p>
         <p>
            Spotify makes it easy to find music or podcasts for any situation, as our service is available on phones,
            computers, tablets and other devices.
         </p>

         <NeonBtn
            className={s.btn}
            goAnotherSite={true} link={AUTH_URL}
            name={'Login With Spotify'}/>
      </div>
   )
}


