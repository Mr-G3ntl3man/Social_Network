import {AppStateType} from "../redux-store";

export const getProfile = (state: AppStateType) => state.profilePage.profile

export const getProfileStatus = (state: AppStateType) => state.profilePage.status

export const getAuthorizedUserId = (state: AppStateType) => state.auth.userData ? state.auth.userData.id : 0