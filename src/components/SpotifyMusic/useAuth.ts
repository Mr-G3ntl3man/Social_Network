import {useState, useEffect} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom";

export const useAuth = (code: string) => {
   const [accessToken, setAccessToken] = useState()
   const [refreshToken, setRefreshToken] = useState()
   const [expiresIn, setExpiresIn] = useState()

   const navigate = useNavigate()

   useEffect(() => {
      axios
         .post("http://localhost:3001/login", {
            code,
         })
         .then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            //@ts-ignore
            window.history.pushState({}, null, "/")
         })
         .catch(() => {
            // window.location = "/"
            navigate('/')
         })
   }, [code])

   useEffect(() => {
      if (!refreshToken || !expiresIn) return
      const interval = setInterval(() => {
         axios
            .post("http://localhost:3001/refresh", {
               refreshToken,
            })
            .then(res => {
               setAccessToken(res.data.accessToken)
               setExpiresIn(res.data.expiresIn)
            })
            .catch(() => {
               // window.location = "/"
               navigate('/')
            })
      }, (expiresIn - 60) * 1000)

      return () => clearInterval(interval)
   }, [refreshToken, expiresIn])

   return accessToken
}