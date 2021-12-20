import {ThunkAction} from "redux-thunk";
import {spotifyAPI} from "../../api/spotify-api";
import {AppRootStateT} from "../redux-store";
import {installCaughtError} from "./app-reducer";

export enum ACTION_TYPE_SPOTIFY {
   SET_TOKEN_INFO = 'social_network/spotify/SET_ACCESS_TOKEN',
   REFRESH_TOKEN_INFO = 'social_network/spotify/REFRESH_TOKEN_INFO',
   SET_CHOOSE_TRACK = 'social_network/spotify/SET_CHOOSE_TRACK',
   SET_LYRICS = 'social_network/spotify/SET_LYRICS',
   SET_IS_FETCHING = 'social_network/spotify/SET_IS_FETCHING',
   SET_SEARCH_RESULTS = 'social_network/spotify/SET_SEARCH_RESULTS',
   SET_SEARCH = 'social_network/spotify/SET_SEARCH',
   SET_RECOMMENDED_TRACKS = 'social_network/spotify/SET_RANDOM_PLAYLIST',
}

export type SearchResultsT = {
   artist: string
   title: string
   uri: string
   albumUrl: string
}

export type TokenT = {
   accessToken: string
   refreshToken: string
   expiresIn: number
}

type DashboardT = {
   search: string
   lyrics: string
   searchResults: SearchResultsT[]
   playingTrack: SearchResultsT | null
}

export type spotifyStateT = {
   token: TokenT
   dashboard: DashboardT
   recommendedTracks: SearchResultsT[]
   isFetching: boolean
}

type ActionT = ReturnType<typeof setTokenInfo>
   | ReturnType<typeof refreshTokenInfo>
   | ReturnType<typeof chooseTrack>
   | ReturnType<typeof setLyrics>
   | ReturnType<typeof setLoadingData>
   | ReturnType<typeof setSearchResults>
   | ReturnType<typeof setSearch>
   | ReturnType<typeof setRecommendedTracks>

type ThunkActionT = ThunkAction<void, AppRootStateT, unknown, ActionT>

const initialState: spotifyStateT = {
   token: {
      accessToken: '',
      refreshToken: '',
      expiresIn: 0,
   },
   dashboard: {
      search: '',
      lyrics: '',
      searchResults: [],
      playingTrack: null
   },
   recommendedTracks: [],
   isFetching: false,
}


export const spotifyReducer = (state = initialState, action: ActionT): spotifyStateT => {
   switch (action.type) {
      case ACTION_TYPE_SPOTIFY.SET_IS_FETCHING:
         return {...state, isFetching: action.isFetching}

      case ACTION_TYPE_SPOTIFY.SET_TOKEN_INFO:
         return {...state, token: action.token}

      case ACTION_TYPE_SPOTIFY.REFRESH_TOKEN_INFO:
         return {...state, token: {...state.token, ...action.token}}

      case ACTION_TYPE_SPOTIFY.SET_LYRICS:
         return {...state, dashboard: {...state.dashboard, lyrics: action.lyrics}}

      case ACTION_TYPE_SPOTIFY.SET_SEARCH:
         return {...state, dashboard: {...state.dashboard, search: action.search}}

      case ACTION_TYPE_SPOTIFY.SET_CHOOSE_TRACK:
         return {
            ...state,
            dashboard: {
               ...state.dashboard,
               playingTrack: action.track,
               search: '',
               lyrics: ''
            }
         }

      case ACTION_TYPE_SPOTIFY.SET_SEARCH_RESULTS:
         return {
            ...state,
            dashboard: {
               ...state.dashboard,
               searchResults: action.searchResults
            }
         }

      case ACTION_TYPE_SPOTIFY.SET_RECOMMENDED_TRACKS:
         return {...state, recommendedTracks: action.playlist}

      default:
         return state
   }
}

const setTokenInfo = (token: TokenT) => ({
   type: ACTION_TYPE_SPOTIFY.SET_TOKEN_INFO, token
} as const)

const refreshTokenInfo = (token: { refreshToken: string, expiresIn: number }) => ({
   type: ACTION_TYPE_SPOTIFY.REFRESH_TOKEN_INFO,
   token
} as const)

const chooseTrack = (track: SearchResultsT) => ({
   type: ACTION_TYPE_SPOTIFY.SET_CHOOSE_TRACK,
   track
} as const)

const setLyrics = (lyrics: string) => ({
   type: ACTION_TYPE_SPOTIFY.SET_LYRICS,
   lyrics
} as const)

export const setSearchResults = (searchResults: SearchResultsT[]) => ({
   type: ACTION_TYPE_SPOTIFY.SET_SEARCH_RESULTS,
   searchResults
} as const)

const setRecommendedTracks = (playlist: SearchResultsT[]) => ({
   type: ACTION_TYPE_SPOTIFY.SET_RECOMMENDED_TRACKS,
   playlist
} as const)


const setLoadingData = (isFetching: boolean) => ({type: ACTION_TYPE_SPOTIFY.SET_IS_FETCHING, isFetching} as const)
export const setSearch = (search: string) => ({type: ACTION_TYPE_SPOTIFY.SET_SEARCH, search} as const)

export const loginTokenSpotify = (code: string): ThunkActionT =>
   async (dispatch) => {
      try {
         dispatch(setLoadingData(true))

         const response = await spotifyAPI.loginToken(code)

         dispatch(setTokenInfo(response))

         dispatch(setLoadingData(false))
      } catch (error) {
         error instanceof Error && dispatch(installCaughtError(error.message, 'error'))
         dispatch(setLoadingData(false))
      }
   }

export const refreshTokenSpotify = (token: string): ThunkActionT =>
   async (dispatch) => {
      try {
         dispatch(setLoadingData(true))

         const response = await spotifyAPI.refreshToken(token)

         dispatch(refreshTokenInfo(response))

         dispatch(setLoadingData(false))
      } catch (error) {
         error instanceof Error && dispatch(installCaughtError(error.message, 'error'))
         dispatch(setLoadingData(false))
      }
   }

export const setChooseTrack = (track: SearchResultsT): ThunkActionT =>
   (dispatch) => {
      dispatch(chooseTrack(track))
   }

export const setLyricsOfPlayingSong = (title: string, artist: string): ThunkActionT =>
   async (dispatch) => {
      try {
         dispatch(setLoadingData(true))

         const response = await spotifyAPI.getLyrics(title, artist)

         dispatch(setLyrics(response.lyrics))

         dispatch(setLoadingData(false))
      } catch (error) {
         error instanceof Error && dispatch(installCaughtError(error.message, 'error'))
         dispatch(setLoadingData(false))
      }
   }

const setTracks = (track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified) => {
   //@ts-ignore
   const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
         if ((image.height || 0) < (smallest.height || 0)) return image

         return smallest
      },
      //@ts-ignore
      track.album.images[0]
   )

   return {
      artist: track.artists[0].name,
      title: track.name,
      uri: track.uri,
      albumUrl: smallestAlbumImage.url,
   }
}

export const getSearchResults = (search: string, cancelSearch: boolean): ThunkActionT =>
   async (dispatch) => {
      try {
         dispatch(setLoadingData(true))

         const res = await spotifyAPI.searchTracks(search)

         if (cancelSearch) return

         dispatch(setSearchResults(res.body.tracks ? res.body.tracks.items.map(setTracks) : []))

         dispatch(setLoadingData(false))
      } catch (error) {
         error instanceof Error && dispatch(installCaughtError(error.message, 'error'))
         dispatch(setLoadingData(false))
      }
   }


export const getRecommendedTracks = (): ThunkActionT =>
   async (dispatch) => {
      try {
         dispatch(setLoadingData(true))

         const res = await spotifyAPI.getRecommended()

         dispatch(setRecommendedTracks(res.body.tracks ? res.body.tracks.map(setTracks) : []))

         dispatch(setLoadingData(false))
      } catch (error) {
         error instanceof Error && dispatch(installCaughtError(error.message, 'error'))
         dispatch(setLoadingData(false))
      }
   }