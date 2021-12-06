import React from "react";
import s from "./user.module.scss";
import {UsersType} from "../../redux/reducer/users-reducer";

type PagesPropsType = {
   onClickSetPageHandler: (page: number) => void
   setPages: (startPage: number, lastPage: number) => void
   userPage: UsersType
   settingsNumberOfPages: any;
}

export const PagesNumber: React.FC<PagesPropsType> = (props) => {
   let pages: number[] = []

   for (let i = props.settingsNumberOfPages.startPage;
        i <= props.settingsNumberOfPages.lastPage; i++) {
      pages.push(i)
   }

   const onClickShowPageNumberHandler = (page: number) => {
      const pageProgress = 5

      if (page - pageProgress < 1) {
         props.setPages(1, 10)
      } else if (page + pageProgress > props.settingsNumberOfPages.totalPage) {
         props.setPages(props.settingsNumberOfPages.totalPage - 10, props.settingsNumberOfPages.totalPage)
      } else {
         props.setPages(page - pageProgress, page + pageProgress)
      }

      props.onClickSetPageHandler(page)
   }

   const onClickGoTotalPage = () => {
      props.setPages(props.settingsNumberOfPages.totalPage - 10, props.settingsNumberOfPages.totalPage)
      props.onClickSetPageHandler(props.settingsNumberOfPages.totalPage)
   }

   const onClickGoToStartPage = () => {
      props.setPages(1, 10)
   }

   return (
      <div className={s.countWrap}>
         <div className={s.countPageValue}>
            <span className={s.page}> Start Page:
               <span onClick={onClickGoToStartPage}>{1} </span> </span>
            <span className={s.page}> Total Pages: <span
               onClick={onClickGoTotalPage}>{props.settingsNumberOfPages.totalPage} </span> </span>
         </div>

         <div className={s.pageNumber}>
            {pages.map(el => <span
                  key={el}
                  onClick={() => onClickShowPageNumberHandler(el)}
                  className={props.userPage.currentPage === el ? `${s.selectedPage} ${s.defaultCount}` : s.defaultCount}
               >{el}</span>
            )}

         </div>


      </div>
   )
}