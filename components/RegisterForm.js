import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const RegisterForm = ({}) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    firstName:'',
    lastName:'',
    email:'',
    username:'',
    password:'',
    confirmPassword:''
  })


  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        console.log('algo fallo')
        throw new Error(res.status)
      }
      await fetch('/api/auth', {
        method:'POST',
        'Content-Type':'application/json',
        body:JSON.stringify({username: form.username, password:form.password })
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to add pet')
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.username) err.username = 'username is required'
    if (!form.password) err.password = 'password is required'
    if (!form.confirmPassword) err.confirmPassword = 'Please confirm your password'
    if (form.password !== form.confirmPassword) err.confirmPassword = 'passwords dont match'
    
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      postData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          maxLength="20"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          maxLength="20"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          maxLength="40"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="username">Username</label>
        <input
          type="text"
          maxLength="20"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          maxLength="20"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
          maxLength="20"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />


        <button type="submit" className="btn">
          Register
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default RegisterForm
