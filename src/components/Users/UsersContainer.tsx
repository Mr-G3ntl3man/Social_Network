import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../redux/redux-store";
import {getUsers,} from "../../redux/reducer/users-reducer";
import React, {useEffect} from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import s from "./user.module.scss";
import {Pagination} from 'antd';

const UsersContainer: React.FC = () => {
   const currentPage = useSelector<AppRootStateT, number>(state => state.usersPage.currentPage)
   const pageSize = useSelector<AppRootStateT, number>(state => state.usersPage.pageSize)
   const totalUserCount = useSelector<AppRootStateT, number>(state => state.usersPage.totalUserCount)
   const isFetching = useSelector<AppRootStateT, boolean>(state => state.usersPage.isFetching)

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getUsers(currentPage, pageSize))
   }, [dispatch, currentPage, pageSize])


   const onChangeCurrentPage = (page: number, pageSize: number) => {
      if (page === 0) page = 1

      dispatch(getUsers(page, pageSize))
   }


   return (
      <div className={s.usersMainWrap}>
         {isFetching && <Preloader/>}

         <Pagination
            className={s.paginator}
            onChange={onChangeCurrentPage}
            defaultCurrent={1}
            defaultPageSize={pageSize}
            total={totalUserCount}/>

         <Users/>
      </div>
   )
}

export default UsersContainer