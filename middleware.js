import { NextResponse } from 'next/server'
import {jwtVerify} from 'jose'

/**
 * Function that executes first whenever a request comes to the server.
 * Here you can validate JWT or other data when coming trough any specific route.
 * With this you're able to protect routes, requiring the request to contain a jwt in a cookie
 * provided to the client when the user logged in.
 * In this way the controller doesn't worry about validating the user.
 * 
 * if we make an array with endpoints we can simply iterate over them and see if it matches
 */
const protectedEndPoints = [
    '/my-pets',
    //'/api/pets', there should be a difference between API endpoints and view endpoints, since you cant redirect a fetch request maybe check if it includes '/api'?
]


export async function middleware(req){
    const secret = process.env.SECRET
    const {pathname} = req.nextUrl
    //console.log(pathname)
    const jwt = req.cookies.get('access_token')
    
    let i=0
    while(i<protectedEndPoints.length){
        if(pathname.includes(protectedEndPoints[i])){
            if(jwt){
                try {
                    const verifiedToken = await jwtVerify(jwt, new TextEncoder().encode(secret))
                    console.log(verifiedToken.payload)
                    return NextResponse.next()    
                } catch (error) {
                    console.error(error)
                    if(pathname.includes('/api')){
                        return NextResponse.status(403).json({success:false, message:'wrong token', data: error})
                    }
                    return NextResponse.redirect( new URL('/login', req.url))
                }
            }
            else{
                if(pathname.includes('/api')){
                    return NextResponse.status(403).json({success:false, message:'wrong token', data: error})
                }
                //console.log('nohay jwt')
                return NextResponse.redirect( new URL('/login', req.url))
            }
        }
        i++
    }
    
    return NextResponse.next()
}