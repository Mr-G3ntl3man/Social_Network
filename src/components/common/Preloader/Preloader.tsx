import React from "react";
import s from './preloader.module.css'


export const Preloader = () => {
   return (
      <div className={s.preloader}>
         <img src={'https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif'} alt="preload"/>
      </div>
   )
}