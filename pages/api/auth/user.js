import User from '../../../models/User'
import { verify } from 'jsonwebtoken'

export default async function handler(req, res){
    const {method, cookies} = req
    console.log(method)
    try{
        const secret = process.env.SECRET
        console.log(secret)
        if(cookies.username){
            const username = cookies.username
            console.log(username)
            const jwt = cookies[`${username}_cookie`]
            console.log(jwt)
            const result = verify(jwt, secret)
            console.log(result)
            if(result && result.username !== username){//se verifica con la llave secret
            
                res.status(403).json({success:false, message: 'quien te crees que sos sin un jwt capo?'})
            }else if (result && result.username === username){
                const user = await User.findOne({username:username})
                res.status(200).json({success:true, message:'found user', data: user})
            }
            if(!result){
                res.status(403).json({success:false, message:'could not verify jwt'})
            }
        }else{
            res.status(403).json({success:false, message:`you're not logged in`})
        }
    }
    catch(error){
        res.status(500).json({success:false, message:error})
    }    
}