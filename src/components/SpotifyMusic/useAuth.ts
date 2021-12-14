import {useState, useEffect} from "react"
import axios from "axios"
import {useNavigate,} from "react-router-dom";


export const useAuth = (code: string) => {
   const [accessToken, setAccessToken] = useState()
   const [refreshToken, setRefreshToken] = useState()
   const [expiresIn, setExpiresIn] = useState()
   const navigate = useNavigate()

   useEffect(() => {
      axios.post("http://localhost:3001/loginSpotify", {code,})
         .then(res => {
            debugger
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)

            navigate('/music')
         })
         .catch((e) => {
            console.log(e)
            navigate('/music')
         })
   }, [code])

   useEffect(() => {
      if (!refreshToken || !expiresIn) return
      const interval = setInterval(() => {
         axios
            .post("http://localhost:3001/refreshToken", {
               refreshToken,
            })
            .then(res => {
               setAccessToken(res.data.accessToken)
               setExpiresIn(res.data.expiresIn)
            })
            .catch((e) => {
               console.log(e)
               navigate('/music')
            })
      }, (expiresIn - 60) * 1000)

      return () => clearInterval(interval)
   }, [refreshToken, expiresIn])

   return accessToken
}