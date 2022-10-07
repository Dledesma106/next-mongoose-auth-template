import dbConnect from '../../../lib/dbConnect'
import Pet from '../../../models/Pet'
import User from '../../../models/User'
import { UserNameJwtPayload, verify} from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import getUserServer from '../../../lib/getUserServerSide'




export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { method, cookies } = req

  await dbConnect()


  switch (method) {
    case 'GET':
      try {
        const pets = await Pet.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: pets })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const {username} = await getUserServer(req)
        const user = await User.findOne({username}) 
        //add user to pet
        const pet = await Pet.create(
          {...req.body, owner: user, owner_name: `${user.firstName} ${user.lastName}`}
        )/* create a new model in the database */
        user.pets.push(pet)
        //console.log(user)
        user.save() /* saving the pet on the user */
        res.status(201).json({ success: true, data: pet })
      } catch (error) {
        res.status(400).json({ success: false, data:error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
