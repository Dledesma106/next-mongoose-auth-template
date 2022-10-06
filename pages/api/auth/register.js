import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {        
        const {username, password, firstName, lastName, email} = req.body
        const userData =  {username, password, firstName, lastName, email}
        
        userData.fullName = `${firstName} ${lastName}`
        /* create a new model in the database */
        const user = await User.create(
          userData
        )        
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        console.log(error)
        res.status(401).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
