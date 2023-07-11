/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import axios from 'axios'
import Swal, {SweetAlertResult} from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useDispatch} from 'react-redux'
import {authState, setAuth} from '../../stores/auth/authSlice'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: 'admin@demo.com',
  password: 'demo',
}

export function Login() {
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const LogUserIn = async (values: any): Promise<any> => {
    try {
      const RESPONSE = await axios.post('http://localhost:5001/auth/signin', {...values})

      return RESPONSE.data.data
    } catch (error: any) {
      console.log(error)
      if (error.response.data.message === 'Invalid user credentials') {
        return MySwal.fire({
          text: `Invalid user credentials`,
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Ok!',
          heightAuto: false,
          customClass: {
            confirmButton: 'btn btn-primary',
          },
        })
      }
      // eslint-disable-next-line valid-typeof
      else if (typeof error.response.data.errors === 'object') {
        return MySwal.fire({
          text: error.response.data.errors.map(
            (e: {path: string; msg: string}) => `${e.path.toUpperCase()}:${e.msg}`
          ),
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Ok!',
          heightAuto: false,
          customClass: {
            confirmButton: 'btn btn-primary',
          },
        })
      }

      // MySwal.fire({
      //   text: 'PickUp Verified',
      //   icon: 'success',
      //   buttonsStyling: false,
      //   confirmButtonText: 'Ok!',
      //   heightAuto: false,
      //   customClass: {
      //     confirmButton: 'btn btn-primary',
      //   },
      // }).then(() => {})
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const user = await LogUserIn(values)
        console.log(user)
        if (user) {
          dispatch(setAuth(user))
        }

        setSubmitting(false)
        setLoading(false)

        // const {data: user} = await getUserByToken(auth.api_token)
        // setCurrentUser(user)
      } catch (error) {
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
        <div className='text-gray-500 fw-semibold fs-6'>Your One-stop SME solution</div>
      </div>
      {/* begin::Heading */}

      {/* begin::Login options */}

      {/* end::Login options */}

      {/* begin::Separator */}

      {/* end::Separator */}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary'>
          Forgot Password ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}

      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up
        </Link>
      </div>
    </form>
  )
}
