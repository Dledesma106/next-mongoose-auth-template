import { verify } from "jsonwebtoken"
import User from "../models/User"
import dbConnect from "./dbConnect"

const secret = process.env.SECRET

export default async function getUserServer(req){
    await dbConnect()
    const {cookies} = req
    let user = {}
    if(cookies.access_token){
        const jwt = cookies.access_token
        const result = verify(jwt, secret)
        if(result){
            const username = result.username
            const {firstName, lastName, _id} = await User.findOne({username})
            user = {username, firstName, lastName, _id:_id.toString()}
            //console.log(user)
            return user
        }
        else return user
    }
    return user
}