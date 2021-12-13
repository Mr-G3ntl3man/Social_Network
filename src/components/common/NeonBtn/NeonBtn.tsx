import React from "react";
import s from './btn.module.scss'
import {Link} from "react-router-dom";


type PropsType = {
   goAnotherSite: boolean
   link: string
   name: string
   callBack?: () => void
   className?: string
   style?: React.CSSProperties
}

export const NeonBtn: React.FC<PropsType> = (props) => {
   const {callBack, name, className, link, goAnotherSite, style} = props

   const onClickHandler = () => {
      callBack && callBack()
   }


   return (
      <>{goAnotherSite
         ? <a href={link} target='blank'>
            <button
               style={style}
               onClick={onClickHandler}
               className={`${s.btn} ${className}`}>
               <span className={`${s.line} ${s.lineTop}`}> </span>
               <span className={`${s.line} ${s.lineLeft}`}> </span>
               <span className={`${s.line} ${s.lineRight}`}> </span>
               <span className={`${s.line} ${s.lineBottom}`}> </span>
               {name}
            </button>
         </a>
         : <Link to={link}>
            <button
               style={style}
               onClick={onClickHandler}
               className={`${s.btn} ${className}`}>
               <span className={`${s.line} ${s.lineTop}`}> </span>
               <span className={`${s.line} ${s.lineLeft}`}> </span>
               <span className={`${s.line} ${s.lineRight}`}> </span>
               <span className={`${s.line} ${s.lineBottom}`}> </span>
               {name}
            </button>
         </Link>
      }
      </>
   )
}