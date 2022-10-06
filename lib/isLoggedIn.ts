

export default function isLoggedIn(user = {}){
    return Object.keys(user).length>0
}