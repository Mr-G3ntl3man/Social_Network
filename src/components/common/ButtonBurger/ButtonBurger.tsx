import React, {useState} from "react";
import style from './burger.module.scss'

type ButtonBurgerPropsT = {
   toggleOpenMenu: () => void
}

export const ButtonBurger: React.FC<ButtonBurgerPropsT> = (props) => {
   const [open, setOpen] = useState(true)

   const finalClassName = open ? `${style.header__burger} ${style.open}` : style.header__burger

   const onClickHandler = () => {
      setOpen(state => !state)
      props.toggleOpenMenu()
   }

   return (
      <button onClick={onClickHandler} className={finalClassName}>
         <span className={style.header__line}> </span>
         <span className={style.header__line}> </span>
         <span className={style.header__line}> </span>
      </button>
   )
}