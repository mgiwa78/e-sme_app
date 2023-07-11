import {createSelector} from '@reduxjs/toolkit'

const selectAuthState = (state: any) => state.auth

export const selectUserAuth = createSelector(selectAuthState, (auth) => auth.userAuth)
export const selectUserToken = createSelector(selectAuthState, (auth) => auth.token)
