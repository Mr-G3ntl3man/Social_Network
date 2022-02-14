import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";
import s from './music.module.scss'
import {useAuth} from "./useAuth";
import {SearchResult} from "./SearchResult";
import {PlayerSpotify} from "./PlayerSpotify";
import {useDispatch, useSelector} from 'react-redux';
import {
   getRecommendedTracks,
   getSearchResults,
   setChooseTrack,
   setLyricsOfPlayingSong,
   setSearch,
   setSearchResults
} from "../../../bll/reducer/spotify-reducer";
import {spotifyAPI} from "../../../dal/spotify-api";
import {AppRootStateT} from "../../../bll/redux-store";
import {Scrollbars} from 'react-custom-scrollbars';
import spotifyLogo from '../../image/Spotify.svg'


export type SearchResultsT = {
   artist: string
   title: string
   uri: string
   albumUrl: string
}

export const Dashboard: React.FC<{ code: string | null }> = ({code}) => {
   const search = useSelector<AppRootStateT, string>(state => state.spotify.dashboard.search)
   const searchResults = useSelector<AppRootStateT, SearchResultsT[]>(state => state.spotify.dashboard.searchResults)
   const playingTrack = useSelector<AppRootStateT, SearchResultsT | null>(state => state.spotify.dashboard.playingTrack)
   const lyrics = useSelector<AppRootStateT, string>(state => state.spotify.dashboard.lyrics)
   const recommendedTracks = useSelector<AppRootStateT, SearchResultsT[]>(state => state.spotify.recommendedTracks)

   const [startSearch, setStartSearch] = useState<boolean>(true)

   const dispatch = useDispatch()

   const accessToken = useAuth(code as string)

   const chooseTrack = useCallback((track: SearchResultsT) => {
      startSearch && setStartSearch(false)
      dispatch(setChooseTrack(track))

   }, [dispatch, startSearch])

   const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      !startSearch && setStartSearch(true)
      dispatch(setSearch(e.currentTarget.value.trimLeft()))
   }

   useEffect(() => {
      if (!playingTrack) return

      dispatch(setLyricsOfPlayingSong(playingTrack.title, playingTrack.artist))
   }, [playingTrack, dispatch])

   useEffect(() => {
      if (!accessToken) return

      spotifyAPI.setAccessToken(accessToken)
   }, [accessToken])

   useEffect(() => {
      if (!accessToken) return

      dispatch(getRecommendedTracks())

   }, [accessToken, playingTrack, dispatch])

   useEffect(() => {
      if (!search) {
         dispatch(setSearchResults([]))
         return
      }
      if (!accessToken) return

      let cancel = false

      dispatch(getSearchResults(search, cancel))

      return () => {
         cancel = true
      }
   }, [search, accessToken, dispatch])

   const trackSearchResult = searchResults.map((track) => {
      return <SearchResult chooseTrack={chooseTrack} track={track} key={track.uri}/>
   })

   const recommendedMusic = recommendedTracks.map((track) => {
      return <SearchResult chooseTrack={chooseTrack} track={track} key={track.uri}/>
   })

   return (
      <div className={s.wrap}>
         <div className={s.title}>Spotify music <span><img src={spotifyLogo} alt="spotify logo"/></span></div>

         <TextField
            variant={'outlined'}
            margin={"normal"}
            fullWidth
            value={search}
            onChange={onChangeHandler}
            label={'Search song/artist/'}/>

         <div className={s.song}>
            <Scrollbars>
               {trackSearchResult}

               {startSearch && !search && !searchResults.length &&
               <div className={s.recommendedTracks}>
                  <span>Random recommended tracks. </span>
                  {recommendedMusic}
               </div>}

               {search && !searchResults.length &&
               <div className={s.notSearch}>
                  There is nothing for "<span>{search}</span>".
                  <span>Check for typos or try another query.</span>
               </div>}

               {!startSearch && playingTrack &&
               <div className={lyrics === 'No Lyrics Found' ? `${s.lyrics} ${s.notFound}` : s.lyrics}>{lyrics}</div>}
            </Scrollbars>
         </div>

         <div className={playingTrack ? s.player : `${s.player} ${s.none}`}>
            <PlayerSpotify
               trackUri={playingTrack?.uri}
               token={accessToken ? accessToken : ''}/>
         </div>
      </div>
   )
}


