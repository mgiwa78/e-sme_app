import {useEffect} from 'react'
import {Navigate, Routes} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {removeAuth} from '../stores/auth/authSlice'

export function Logout() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(removeAuth)
    document.location.reload()
  }, [])

  return (
    <Routes>
      <Navigate to='/auth/signin' />
    </Routes>
  )
}
