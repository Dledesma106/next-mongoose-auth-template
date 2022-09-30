import dbConnect from '../../../lib/dbConnect'
import cookie from 'cookie'

export default async function handler(req, res) {
  const { method } = req

  const cookieOptions = {
    httpOnly:true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0), //0 days, it expires the cookei
    path:'/'
  }

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        res.setHeader('Set-Cookie', cookie.serialize(`access_token`, '', cookieOptions))
        console.log('pude sacar la cookie')
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