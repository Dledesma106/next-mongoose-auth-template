import { NextResponse, NextRequest } from 'next/server'
import {jwtVerify} from 'jose'

/**
 * Function that executes first whenever a request comes to the server.
 * Here you can validate JWT or other data when coming trough any specific route.
 * With this you're able to protect routes, requiring the request to contain a jwt in a cookie or a jwt alone(for mobile apps)
 * provided to the client when the user logged in.
 * In this way the controller doesn't worry about validating the user.
 * 
 * (1)for web users we get the jwt from the cookie, but for mobile users we simply verify the jwt that should come in every request after login
 * 
 * (2)there should be a difference between (API endpoints or mobile app request) and view endpoints, since you cant redirect a fetch request or a mobile app we check if the pathname includes '/api' or the request comes from an app
 * 
 * 
 * if we make an array with endpoints we can simply iterate over them and see if the path the request is trying to reach matches any
 * 
 */
const protectedEndPoints = [
    '/my-pets',
]


export async function middleware(req:NextRequest){
    const secret = process.env.SECRET
    const {pathname} = req.nextUrl
    //console.log(pathname)
    const jwt = /* req.body.appRequest? req.body.access_token: */req.cookies.get('access_token') //(1)
    
    
    for(let i=0;i<protectedEndPoints.length;i++){
        if(pathname.includes(protectedEndPoints[i])){
            if(jwt){
                try {
                    const verifiedToken = await jwtVerify(jwt, new TextEncoder().encode(secret))
                    console.log(verifiedToken.payload)
                    return NextResponse.next()    
                } catch (error) {
                    console.error(error)
                    if(pathname.includes('/api') /* || req.body.appRequest */){//(2)
                        return NextResponse.status(403).json({success:false, message:'wrong token', data: error})
                    }
                    return NextResponse.redirect( new URL('/login', req.url))
                }
            }
            else{
                if(pathname.includes('/api') /* || req.body.appRequest */){//(2)
                    return NextResponse.status(403).json({success:false, message:'no token', data: error})
                }
                //console.log('nohay jwt')
                return NextResponse.redirect( new URL('/login', req.url))
            }
        }
    }
    
    return NextResponse.next()
}