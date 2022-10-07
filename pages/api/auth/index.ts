import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import cookie from 'cookie'
import {sign} from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { UserInterface } from '../../../models/interfaces'
import { CookieSerializeOptions } from 'next/dist/server/web/types'

const secret = process.env.SECRET || ''



export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { method } = req

  const getToken = (user:UserInterface) => {
    return sign({
      exp: Math.floor(Date.now() / 1000) + 60 *60 * 24 * 30, //30 days
      username:user.username
    }, secret)
  }

  const cookieOptions:CookieSerializeOptions = {
    httpOnly:true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60*60*24*30, //30 days
    path:'/'
  }

  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const {username, password, appRequest} = req.body
        let user = await User.findOne({username})/* find user by username */
        if(!user.comparePassword(password)){
          res.status(403).json({success:false}) 
        } 
        if(appRequest){
          res.status(201).json({success:true, data:{access_token:getToken(user)}})
        }else{
          res.setHeader('Set-Cookie', cookie.serialize(`access_token`, getToken(user), cookieOptions))
          res.status(201).json({ success: true, message: 'success' })
        }
      } catch (error) {
        
        console.log(error)
        res.status(500).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}