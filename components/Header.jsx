import Link from 'next/link'

import { useState, useEffect } from 'react'
import petLogo from '../public/Pet_logo_with_flowers.png'
import { useRouter } from 'next/router'
import Image from 'next/image'
import * as GS from '../globalStyles'


import {useUser} from '../context/userContext'


export default function Header(){
    const router = useRouter()
    const {user, logoutUser, getBaseUrl, isLoggedIn} = useUser()

    const logout = async() => {
        
        try {
            const baseUrl = await getBaseUrl()
            await fetch(`${baseUrl}api/auth/logout`)
        } catch (error) {
            console.log(error)
        }
        logoutUser()
        router.push('/')
    }



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
                {isLoggedIn() && <h2>Hello {`${user.firstName}`}!</h2>}
            </div>
            <div className="nav">
            {isLoggedIn() &&<Link href="/my-pets">
                <a style={GS.buttonStyle}>My Pets</a>
            </Link>}
            {!isLoggedIn() && <Link href="/login">
                <a style={GS.buttonStyle}>
                    Sign in
                </a>
            </Link>}
            {!isLoggedIn() && <Link href="/login/register">
                <a style={GS.buttonStyle}>Sign up</a>
            </Link>}
            {isLoggedIn() && <div onClick={logout} style={GS.buttonStyle}>
                Sign out
            </div>}
            </div>
        </div>
    )
}