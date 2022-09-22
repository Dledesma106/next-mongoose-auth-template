import dbConnect from '../../../lib/dbConnect'
import Pet from '../../../models/Pet'
import User from '../../../models/User'
import {verify} from 'jsonwebtoken'

export default async function handler(req, res) {
  const { method, cookies } = req

  await dbConnect()

  const userIsLoggedIn = () =>{
    const secret = process.env.SECRET
    if(cookies.username){
      const username = cookies.username
      //console.log(username)
      const jwt = cookies[`${username}_cookie`]
      //console.log(jwt)
      const result = verify(jwt, secret) //it's verified with the secret key
      //console.log(result)
      if(result && result.username !== username){
          return false
      }else if (result && result.username === username){
          return true
      }
      if(!result){
          return false
      }
    }else{
      return false
    }
  }

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
        if(userIsLoggedIn()){
          const user = await User.findOne({username:req.cookies.username}) 
          //add user to pet
          const pet = await Pet.create(
            {...req.body, owner: user, owner_name: `${user.firstName} ${user.lastName}`}
          )
          user.pets.push(pet)
          console.log(user)
          user.save() /* create a new model in the database */
          res.status(201).json({ success: true, data: pet })
        }
      } catch (error) {
        res.status(400).json({ success: false, data:error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
