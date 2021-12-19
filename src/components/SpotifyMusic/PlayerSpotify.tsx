import React, {useEffect, useState} from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export const PlayerSpotify: React.FC<{ token: string, trackUri?: string }> = ({token, trackUri}) => {
   const [play, setPlay] = useState<boolean>(false)

   useEffect(() => {
      setPlay(true)
   }, [trackUri])

   if (!token) return <div></div>

   return <SpotifyPlayer
      styles={{sliderColor: '#1cb954'}}
      showSaveIcon
      play={play}
      callback={state => {
         if (!state.isPlaying) setPlay(false)
      }}
      uris={trackUri ? [trackUri] : []}
      token={token}/>


}