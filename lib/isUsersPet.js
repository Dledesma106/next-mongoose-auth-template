

export default function isUsersPet(user, pet){
    return user._id === pet.owner.toString()
}