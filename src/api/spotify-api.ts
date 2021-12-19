import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

const instance = axios.create({
   baseURL: 'https://spotify-provider-server.herokuapp.com/'
})

const spotifyWebApi = new SpotifyWebApi({
   clientId: 'ea7ec046e46f4faea91091b10e65d993',
})

type loginSpotifyR = {
   accessToken: string
   expiresIn: number
   refreshToken: string
}

export const spotifyAPI = {
   loginToken(code: string) {
      return instance.post<loginSpotifyR>("loginSpotify", {code,})
         .then(res => res.data)
   },
   refreshToken(token: string) {
      return instance.post<{ expiresIn: number, refreshToken: string }>("refreshToken", {token,})
         .then(res => res.data)
   },
   getLyrics(title: string, artist: string) {
      return instance.get<{ lyrics: string }>('lyrics', {
         params: {track: title, artist: artist,}
      })
         .then(res => res.data)
   },
   searchTracks(search: string) {
      return spotifyWebApi.searchTracks(search)
   },
   setAccessToken(accessToken: string) {
      return spotifyWebApi.setAccessToken(accessToken)
   },
   getRecommended() {
      return spotifyWebApi.getRecommendations({
         min_energy: 0.4,
         seed_genres: ["chill", "dance", "study", "deep-house"],
         min_popularity: 70
      })
   },
   getAvailableGenreSeeds() {
      return spotifyWebApi.getAvailableGenreSeeds()
   }
}

