import express from "express"
import SpotifyWebApi from 'spotify-web-api-node'
import cors from 'cors'
import bodyParser from 'body-parser'


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post("/refreshToken", (req, res) => {
   const refreshToken = req.body.refreshToken
   const spotifyApi = new SpotifyWebApi({
      redirectUri: 'http://localhost:3000',
      clientId: 'ea7ec046e46f4faea91091b10e65d993',
      clientSecret: '86eff131454149dab4428afca96ca52c',
      refreshToken,
   })

   spotifyApi
      .refreshAccessToken()
      .then(data => {
         res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
         })
      })
      .catch(err => {
         console.log(err)
         res.sendStatus(400)
      })
})

app.post("/loginSpotify", (req, res) => {
   const code = req.body.code
   const spotifyApi = new SpotifyWebApi({
      redirectUri: 'http://localhost:3000',
      clientId: 'ea7ec046e46f4faea91091b10e65d993',
      clientSecret: '86eff131454149dab4428afca96ca52c',
   })

   spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
         res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
         })
      })
      .catch(err => {
         console.log(err)
         res.sendStatus(400)
      })
})

// app.get("/lyrics", async (req, res) => {
//    const lyrics =
//       (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
//    res.json({lyrics})
// })

app.listen(3001)
