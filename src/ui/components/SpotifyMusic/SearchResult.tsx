import React from 'react';
import {SearchResultsT} from "./Dashboard";
import s from './music.module.scss'


export const SearchResult: React.FC<{ track: SearchResultsT, chooseTrack: (song: any) => void }> = React.memo((
   {
      track,
      chooseTrack
   }) => {

   const onClickHandler = () => chooseTrack(track)

   return (
      <div onClick={onClickHandler} className={s.searchResult}>
         <img src={track.albumUrl} alt="track album logo"/>
         <div className={s.descWrap}>
            <div className={s.trackTitle}>{track.title}</div>
            <div className={s.trackArtist}>{track.artist}</div>
         </div>
      </div>
   )
})



