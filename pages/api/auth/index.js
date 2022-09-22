import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import cookie from 'cookie'
import {sign} from 'jsonwebtoken'

const secret = process.env.SECRET
export default async function handler(req, res) {
  const { method } = req

  const getToken = (user) => {
    return sign({
      exp: Math.floor(Date.now() / 1000) + 60 *60 * 24 * 30, //30 days
      username:user.username
    }, secret)
  }

  const cookieOptions = {
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
        const {username, password} = req.body
        //console.log('intento recuperar el usuario')
        let user = await User.findOne({username:username})/* find user by username */
        //console.log('recupere el usuario')
        //console.log(user)
        if(!user.comparePassword(password)){
          //console.log('esa no es la contraseña')
          res.status(403).json({success:false}) 
        } 
        //console.log('esa es la contraseña')//

        res.setHeader('Set-Cookie', cookie.serialize(`${username}_cookie`, getToken(user), cookieOptions))
        res.status(201).json({ success: true, message: 'success' })
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