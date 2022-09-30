import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext()

export const useUser = () => {
    const context = useContext(UserContext)
    return context
}

export const UserProvider = ({children}) =>{
    

    const [user, setUser] = useState({})

    //function 
    async function getFullUrl(){  
        let res = await fetch('/api/full-url')
        res = await res.json()
        return await res.data
    }
    
    //function that gets the base url(protocol+hostname)
    async function getBaseUrl(){
        const url = await getFullUrl()
        const splitUrl = url.split('')
        let count = 0
        let i = 0
        while(count < 3 && i<splitUrl.length){
            if(splitUrl[i] === '/'){
                count++
            }
            i++
        }
        return splitUrl.slice(0, i).join('')
    }
    
    async function getUser(){
        const baseUrl = await getBaseUrl()
    
        let res = await fetch(baseUrl+'api/auth/user')
        let user = {}
        if(res.ok){
            res = await res.json()
            if(res.data._id){
                const {username, firstName, lastName, _id} = res.data
                user = {username, firstName, lastName, _id: _id.toString()}
            }
            return user
        }
        else return user    
    }

    async function loginUser(){
        setUser(await getUser())
    }

    function isLoggedIn(){
        return Object.keys(user).length>0
    }

    function logoutUser(){
        setUser({})
    }
    return(
        <UserContext.Provider value={{user, loginUser, logoutUser, getBaseUrl, isLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}