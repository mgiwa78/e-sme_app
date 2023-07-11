/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, Router, useNavigate} from 'react-router-dom'
import {PasswordMeterComponent} from '../../types/components'
import axios from 'axios'
import {authState, setAuth} from '../../stores/auth/authSlice'
import {useDispatch} from 'react-redux'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const initialValues = {
  roles: 'Super Admin',
  changepassword: '',
  acceptTerms: false,
  email: 'mail@mail.com',
  password: 'Password',
  firstName: 'Muhammad',
  lastName: 'Giwa',
}

interface RegValues {
  roles: string
  changepassword: string
  acceptTerms: boolean
  email: string
  password: string
  firstName: string
  lastName: string
}

const registrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  roles: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Roles are required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  lastName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  changepassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

const UserSignUp = async (values: RegValues) => {
  const RESPONSE = await axios.post('http://localhost:5001/auth/signup', {...values})

  return RESPONSE.data
}
export function Registration() {
  const MySwal = withReactContent(Swal)
  const Navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {
          data: {userAuth, userJwt},
        } = await UserSignUp(values)
        const auth = {userAuth, userJwt} as authState

        dispatch(setAuth(auth))

        return MySwal.fire({
          text: 'Registration Success, Go to dashboard?',
          icon: 'success',
          buttonsStyling: false,
          confirmButtonText: 'Yes!',
          heightAuto: false,
          customClass: {
            confirmButton: 'btn btn-primary',
          },
        }).then(() => {
          Navigate('/dashboard')
        })
      } catch (error: any) {
        if (error.response.data.message) {
          return MySwal.fire({
            text: error.response.data.message,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Ok!',
            heightAuto: false,
            customClass: {
              confirmButton: 'btn btn-primary',
            },
          })
        } else if (typeof error.response.data.errors === 'object') {
          setStatus('The registration details is incorrect')

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
        } else {
          return MySwal.fire({
            text: error.message,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Ok!',
            heightAuto: false,
            customClass: {
              confirmButton: 'btn btn-primary',
            },
          })
        }
      } finally {
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-3'>Sign Up</h1>
        {/* end::Title */}

        <div className='text-gray-500 fw-semibold fs-6'>Your One-stop SME solution</div>
      </div>
      {/* end::Heading */}

      {/* begin::Login options */}

      {/* end::Login options */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group FirstName */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>First name</label>
        <input
          placeholder='First name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('firstName')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.firstName && formik.errors.firstName,
            },
            {
              'is-valid': formik.touched.firstName && !formik.errors.firstName,
            }
          )}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.firstName}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
      <div className='fv-row mb-8'>
        {/* begin::Form group LastName */}
        <label className='form-label fw-bolder text-dark fs-6'>Last name</label>
        <input
          placeholder='Last name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('lastName')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.lastName && formik.errors.lastName,
            },
            {
              'is-valid': formik.touched.lastName && !formik.errors.lastName,
            }
          )}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.lastName}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>
      <div className='fv-row mb-8'>
        {/* begin::Form group LastName */}
        <label className='form-label fw-bolder text-dark fs-6'>Roles</label>
        <input
          placeholder='Roles'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('roles')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.roles && formik.errors.roles,
            },
            {
              'is-valid': formik.touched.roles && !formik.errors.roles,
            }
          )}
        />
        {formik.touched.roles && formik.errors.roles && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.roles}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>

      {/* begin::Form group Email */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='fv-row mb-8' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
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
          {/* begin::Meter */}
          <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div>
          {/* end::Meter */}
        </div>
        <div className='text-muted'>
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
        <input
          type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          {...formik.getFieldProps('changepassword')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.changepassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <span>
            I Accept the{' '}
            <a
              href='https://keenthemes.com/metronic/?page=faq'
              target='_blank'
              className='ms-1 link-primary'
            >
              Terms
            </a>
            .
          </span>
        </label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
