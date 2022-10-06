/* import mongoose from 'mongoose'
import User from './User'
import * as cookies from 'next-cookies'

const SessionSchema = new mongoose.Schema({
    nickname:{
        type:String,
        required:true,
        unique: true
    },
    cookie:{
        type:String,
        required:true,
        unique:true
    },
    user:{
        type:User,
        required:true,
    }    
}, {timestamps:true})

SessionSchema.pre('save', )
export default mongoose.models.Session || mongoose.model('Session', SessionSchema) */