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
        console.log(`intento crear el usuario con ${JSON.stringify(userData)}`)
        userData.fullName = `${firstName} ${lastName}`
        const user = await User.create(
          userData
        )
        console.log('pude crear el usuario')
        
         /* create a new model in the database */
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
