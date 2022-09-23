

export default function isUsersPet(user, pet){
    return user.id === pet.owner.toString()
}