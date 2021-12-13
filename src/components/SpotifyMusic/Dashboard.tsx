import React from 'react';
import {useAuth} from "./useAuth";


export const Dashboard: React.FC<{ code: string | null }> = ({code}) => {
   const accessToken = useAuth(code as string)

   return (
      <div>{code}</div>
   )
}


