import Container from '@material-ui/core/Container';
import React from 'react';
import {useAuth} from "./useAuth";
import {TextField} from "@material-ui/core";
import s from './music.module.scss'


export const Dashboard: React.FC<{ code: string | null }> = ({code}) => {
   const accessToken = useAuth(code as string)

   return (
      <div className={s.wrap}>
         <TextField
            variant={'outlined'}
            margin={"normal"}
            fullWidth
            label={'Search song/artist/'}/>
         <div className={s.song}>
            Song
         </div>
         <div className="player">
            player

         </div>

      </div>
   )
}


