import {createSlice} from '@reduxjs/toolkit'
import AuthActions from './authActions'
export interface authState {
  userAuth: null | any
  userJwt: string
}

const initialState = {
  userAuth: null,
  userJwt: '',
}

const authSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    ...AuthActions,
  },
})

export const {setAuth, removeAuth} = authSlice.actions

export default authSlice.reducer
