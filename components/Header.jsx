import Link from 'next/link'
import * as cookies from 'cookies-next'
import { useState, useEffect } from 'react'
import petLogo from '../public/Pet_logo_with_flowers.png'
import { useRouter } from 'next/router'
import Image from 'next/image'

const buttonStyle = {
    backgroundColor:'#333',
    padding: '0.5em 1em',
    color: '#eee',
    borderRadius:'1em',
    textDecoration:'none',
    border:'none',
    margin:'0.5em',
    cursor: 'pointer'
}

export default function Header({user = {}}){
    
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const logout = async() => {
        await fetch('api/auth/logout')
        cookies.deleteCookie('username')
        router.push('/')
    }

    useEffect(() => {
        setIsLoggedIn(Object.keys(user).length>0)
    },[user])

    return(
        <div className="top-bar">
            <div style={{display:'flex'}}>
                <Link href="/">
                    <a>
                        <Image
                            height={'80px'}
                            width={'80px'}
                            src={petLogo}
                            alt="pet care logo"
                        />  
                    </a>
                </Link>
                {isLoggedIn && <h2>Hola {`${user.firstName}`}!</h2>}
            </div>
            <div className="nav">
            {isLoggedIn &&<Link href="/my-pets">
                <a style={buttonStyle}>My Pets</a>
            </Link>}
            {!isLoggedIn && <Link href="/login">
                <a style={buttonStyle}>
                    Sign in
                </a>
            </Link>}
            {!isLoggedIn && <Link href="/login/register">
                <a style={buttonStyle}>Sign up</a>
            </Link>}
            {isLoggedIn && <div onClick = {logout} style={buttonStyle}>
                Sign out
            </div>}
            </div>
        </div>
    )
}