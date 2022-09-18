import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'
import * as cookies from 'cookies-next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import User from '../models/User'
import dbConnect from '../lib/dbConnect'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const logout = async() => {
    await fetch('api/auth/logout')
    cookies.deleteCookie('username')
    router.push('/')
  }
  
  
  return (
    <>
      <Head>
        <title>Pet Care App</title>
      </Head>

      <div className="top-bar">
        <div style={{display:'flex'}}>
          <Link href="/">
            <a>
              <img
                style={{height:'80px'}}
                src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Pet_logo_with_flowers.png"
                alt="pet care logo"
                />  
            </a>
          </Link>
          {pageProps.user && <h2>Hola {`${JSON.stringify(pageProps.user)}`}!</h2>}
        </div>
        <div className="nav">
          <Link href="/new">
            <a>Add Pet</a>
          </Link>
          <Link href="/login">
            <a>Sign in</a>
          </Link>
          <Link href="/login/register">
            <a>Sign up</a>
          </Link>
          <button onClick = {logout}>
            Sign out
          </button>
        </div>

      </div>
      <div className="grid wrapper">

        <Component {...pageProps} />
      </div>
    </>
  )
}

export async function getServerSideProps({req,res}) {

  await dbConnect()
  let user = ''
  if (req.cookies.username){
    console.log('intento buscar el user')
    user = await User.findOne({username:req.cookies.username})
    console.log(user.firstName)
  }

  return { props: { user: user } }
}

export default MyApp
