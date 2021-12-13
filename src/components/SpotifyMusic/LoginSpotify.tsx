import React from 'react';
import {Container} from "@material-ui/core";
import {NeonBtn} from "../common/NeonBtn/NeonBtn";

const AUTH_URL =
   "https://accounts.spotify.com/authorize?client_id=ea7ec046e46f4faea91091b10e65d993&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


export const LoginSpotify: React.FC = () => {
   return (
      <Container
         style={{minHeight: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

         <NeonBtn style={{width: '300px'}} goAnotherSite={true} link={AUTH_URL}
                  name={'Login With Spotify'}/>

      </Container>
   )
}


