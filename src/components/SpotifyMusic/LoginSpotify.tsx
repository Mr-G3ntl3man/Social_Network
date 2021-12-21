import React from 'react';
import {NeonBtn} from "../common/NeonBtn/NeonBtn";
import s from './music.module.scss'
import logo from '../../image/SpotifyIcon.svg'
import {AUTH_URL} from "../../api/spotify-api";
import {Tooltip, TooltipProps} from "@material-ui/core";
import {styled} from '@mui/material/styles';
import {tooltipClasses} from "@mui/material";

export const LoginSpotify: React.FC = () => {
   const CustomTooltip = styled(({className, ...props}: TooltipProps) => (
      <Tooltip {...props} classes={{popper: className}}/>
   ))(({theme}) => ({
      [`& .${tooltipClasses.tooltip}`]: {
         backgroundColor: '#f5f5f9',
         color: 'rgba(0, 0, 0, 0.87)',
         maxWidth: 320,
         fontSize: 15,
         border: '1px solid #dadde9',
      },
   }));

   return (
      <div className={s.container}>
         <h2> Music from <span><img src={logo} alt="spotifyLogo"/></span></h2>

         <p>
            Yo! You can listen to music from Spotify.
         </p>
         <p>
            Application is in
            <CustomTooltip
               title='Up to 25 Spotify users can install and use your app. These users must be explicitly added under the section "Users and Access" before they can authenticate with your app. If you’d like to ship your app to a broader audience, let us know by submitting a quota extension request.'>
               <a className={s.dev} href="#">development mode</a>
            </CustomTooltip>
            for testing use a test account!
         </p>
         <div className={s.accountCredentials}>
            <span>Email: pecab31632@ritumusic.com</span>
            <span>Password: Account_For_Test</span>
         </div>

         <NeonBtn
            className={s.btn}
            goAnotherSite={true} link={AUTH_URL}
            name={'Login With Spotify'}/>
      </div>
   )
}


