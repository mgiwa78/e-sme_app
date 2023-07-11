import type {authState} from './authSlice'

const setAuth = (state: authState, action: {payload: authState}) => {
  console.log(action)
  const userAuth = action.payload
  state.userAuth = userAuth.userAuth
  state.userJwt = userAuth.userJwt
}
const removeAuth = (state: authState) => {
  state.userAuth = null
  state.userJwt = ''
}
const AuthActions = {setAuth, removeAuth}

export default AuthActions
