import {useEffect} from "react"
import {useNavigate,} from "react-router-dom";
import {loginTokenSpotify, refreshTokenSpotify, setIsAuth} from "../../redux/reducer/spotify-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../redux/redux-store";
import {PATH} from "../../Router/Routes";
import {restoreState, saveState} from "../../redux/reducer/localStorage/localStorage";

export const useAuth = (code: string) => {
   const accessToken = useSelector<AppRootStateT, string>(state => state.spotify.token.accessToken)
   const refreshToken = useSelector<AppRootStateT, string>(state => state.spotify.token.refreshToken)
   const expiresIn = useSelector<AppRootStateT, number>(state => state.spotify.token.expiresIn)

   const dispatch = useDispatch()

   const navigate = useNavigate()

   useEffect(() => {
      if (!accessToken) dispatch(loginTokenSpotify(code))

      dispatch(setIsAuth(restoreState<{ isAuth: boolean }>('authSpotify', {isAuth: false})))

      navigate(PATH.SPOTIFY_MUSIC)
      return () => saveState<{ isAuth: boolean }>('authSpotify', {isAuth: false})
   }, [code])

   useEffect(() => {
      if (!refreshToken || !expiresIn) return

      const interval = setInterval(() => {
         dispatch(refreshTokenSpotify(refreshToken))

         navigate(PATH.SPOTIFY_MUSIC)
      }, (expiresIn - 60) * 1000)

      return () => clearInterval(interval)
   }, [refreshToken, expiresIn])

   return accessToken
}