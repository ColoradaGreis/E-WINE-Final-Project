import style from './formLogin.module.css'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import jwtdecode from 'jwt-decode'
import { schemaLogin } from '../utilities/schemas'

export default function FormLogin () {
  const cookies = new Cookies()
  const user = cookies.get('TOKEN')
  console.log(user)

  function handleCallbackResponse (response) {
    console.log('Encoded JWT ID token: ' + response.credential)
    const userObject = jwtdecode(response.credential)
    console.log(userObject)
    fetch('https://e-winespf.herokuapp.com/users/email/' + userObject.email)
      .then(res => res.json())
      .then(data => {
        if (!data) {
          fetch('https://e-winespf.herokuapp.com/users/', {
            method: 'POST',
            body: JSON.stringify({
              email: userObject.email,
              password: 'password',
              region: 'null',
              username: userObject.name,
              image: userObject.picture
            }),
            headers: {
              'Content-type': 'application/json'
            },
            credentials: 'include'
          })

            .then((res) => res.json())
            .then((data) => {
              console.log(data)
            })
        }
        fetch('https://e-winespf.herokuapp.com/users/login', {
          method: 'POST',
          body: JSON.stringify({
            email: userObject.email,
            password: 'password'
          }),
          headers: {
            'Content-type': 'application/json'
          },
          credentials: 'include'
        })

          .then((res) => res.json())
          .then((data) => {
            if (typeof data !== 'string') {
              cookies.set('TOKEN', data, {
                path: '/'
              })
              setButton(true)
              setSuccess(true)
              setTimeout(() => { setSuccess(false) }, 3000)
            } else {
              setError(!err)
              setTimeout(() => {
                setError(false)
              }, 3000)
            }
          })
      }

      )
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '299866186395-evt7gful4jbfl5bctqnbp74c9a8i6h88.apps.googleusercontent.com',
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    )
  }, [])

  const { values, handleChange, handleBlur, errors, touched, handleSubmit, isSubmitting } = useFormik({ //eslint-disable-line

    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: schemaLogin,

    onSubmit: async (values, { resetForm }) => {
      if (!user) {
        fetch('https://e-winespf.herokuapp.com/users/login', {
          method: 'POST',
          body: JSON.stringify({
            email: values.email,
            password: values.password
          }),
          headers: {
            'Content-type': 'application/json'
          },
          credentials: 'include'
        })

          .then((res) => res.json())
          .then((data) => {
            resetForm()
            if (typeof data !== 'string') {
              cookies.set('TOKEN', data, {
                path: '/'
              })
              setButton(true)
              setSuccess(true)
              setTimeout(() => { setSuccess(false) }, 3000)
            } else {
              setError(!err)
              setTimeout(() => {
                setError(false)
              }, 3000)
            }
          })
      }
    }
  })
  const [err, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [button, setButton] = useState(false)

  function removeCookies () {
    cookies.remove('TOKEN')
    setButton(false)
  }

  return (
    <div className='user-select-none'>

      <button type='button' className={style.navlink} data-bs-toggle='modal' data-bs-target='#exampleModal'>
        {!user ? 'Iniciar sesión' : 'Cerrar sesión'}
      </button>

      <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-3' id='exampleModalLabel'>{!user ? 'Iniciar sesión' : 'Cerrar sesión'}</h1>
              <button type='button' className='btn-close fs-3' data-bs-dismiss='modal' aria-label='Close' />
            </div>
            <div className='modal-body'>
              <form onSubmit={handleSubmit} className='card d-flex justify-content-center mx-auto my-3 p-5' autoComplete='off'>
                <div className='row justify-content-center'>
                  <div className='col-12'>
                    <label htmlFor='email' className='fs-3'>Email</label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      className={`form-control ${!err ? touched.email ? errors.email ? 'is-invalid' : 'is-valid' : null : 'is-invalid'}`}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email ? <div className='invalid-feedback fs-4'>{errors.email}</div> : null}
                  </div>
                  <div className='col-12'>
                    <label htmlFor='password' className='fs-3'>Password</label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      className={`form-control 
                      ${!err ? touched.password ? errors.password ? 'is-invalid' : 'is-valid' : null : 'is-invalid'}`}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.password && errors.password ? <div className='invalid-feedback fs-4'>{errors.password}</div> : null}
                  </div>
                  {!button && <button className='btn btn-success mt-3 ' type='submit'>Iniciar sesión</button>}
                  {button && <button className='btn btn-danger mt-3 ' type='submit' onClick={() => removeCookies()}>Cerrar sesión</button>}
                  {err &&
                    <div className='alert alert-danger mt-3' role='alert'><p>Correo o contraseña incorrecto</p></div>}
                  {
                    <div
                      className={style.googleBtn}
                      id='signInDiv'
                    />
                  }
                  {success &&
                    <div className='alert alert-success mt-3' role='alert'><p>Ha iniciado sesion</p> </div>}
                </div>
              </form>

            </div>
            <div className='modal-footer'>
              <button type='button' className='d-none btn btn-secondary' data-bs-dismiss='modal'>Close</button>
              <p className='fs-4'>
                Sino tienes cuenta <Link className='text-decoration-none' to='/register'>!Crea tu Cuenta</Link>
              </p>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
