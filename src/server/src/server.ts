import express from "express"
import SpotifyWebApi from 'spotify-web-api-node'
import cors from 'cors'
import bodyParser from 'body-parser'


const app = express()

app.use(cors)
app.use(bodyParser.json())

app.post('/login', (req, res) => {
   const code = req.body.code

   const spotifyApi = new SpotifyWebApi({
      redirectUri: 'http://localhost:3000/',
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
         res.sendStatus(400)
      })

})


app.listen(3001, () => {
   console.log('Server listening on port! Successfully!')
})