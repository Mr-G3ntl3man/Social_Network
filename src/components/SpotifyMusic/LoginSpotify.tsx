import React from 'react';
import {NeonBtn} from "../common/NeonBtn/NeonBtn";
import s from './music.module.scss'
import logo from '../../image/SpotifyIcon.svg'

const AUTH_URL =
   "https://accounts.spotify.com/authorize?client_id=ea7ec046e46f4faea91091b10e65d993&response_type=code&redirect_uri=http://localhost:3000/spotifyMusic&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export const LoginSpotify: React.FC = () => {
   return (
      <div className={s.container}>
         <h2> Music from <span><img src={logo} alt="spotifyLogo"/></span></h2>

         <p>
            Yo! You can listen to music from Spotify. To do this, you need to log in!
         </p>

         <NeonBtn
            className={s.btn}
            goAnotherSite={true} link={AUTH_URL}
            name={'Login With Spotify'}/>
      </div>
   )
}


