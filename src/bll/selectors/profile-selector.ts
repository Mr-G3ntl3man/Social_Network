import {AppRootStateT} from "../redux-store";

export const getProfile = (state: AppRootStateT) => state.profilePage.profile

export const getProfileStatus = (state: AppRootStateT) => state.profilePage.status

export const getAuthorizedUserId = (state: AppRootStateT) => state.auth.userData ? state.auth.userData.id : 0