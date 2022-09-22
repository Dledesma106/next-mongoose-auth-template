import dbConnect from "./dbConnect"
import User from "../models/User"

export default async function getUser(req){
    await dbConnect()
    let user = {}
    if (req.cookies.username){
        const {username, firstName, lastName} = await User.findOne({username:req.cookies.username})
        user = {username, firstName, lastName}
    }    
    return user
}
