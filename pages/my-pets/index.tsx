//view for every pet of the user

import dbConnect from '../../lib/dbConnect'
import Link from 'next/link'
import Pet from '../../models/Pet'
import PetCard from '../../components/PetCard'
//import Header from '../../components/Header'
import getUserServer from '../../lib/getUserServerSide'
import * as GS from '../../globalStyles'
import { PetInterface } from '../../models/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'

interface props{
  pets:PetInterface[]
}

const MyPets = ({pets}:props) => {
  //console.log(pets)
  return(
  <>
    {/* Create a card for each pet */}
    {/* <Header user={user}/> */}
    <h2 style={{textAlign:'center'}}>My Pets</h2>
    <Link href='/my-pets/new'>
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <a style={GS.buttonStyle}>
          Add a pet!
        </a>
      </div>
    </Link>
    <div className="grid wrapper">
      {pets.map((pet) => (<PetCard key={pet._id.toString()} pet={pet} isMyPet={true}/>))}
    </div>
  </>)
}

//Retrieves pet(s) data from mongodb database 
export async function getServerSideProps({req,res}:{req:NextApiRequest;res:NextApiResponse}) {
    await dbConnect()
    //console.log(`req in gssp in /mypets: ${req.headers.referer}`)
    let user = await getUserServer(req)
    //console.log(`user in gssp from /my-pets: ${JSON.stringify(user)}`)
    let pets = []
    if (Object.keys(user).length>0){
        //it's easier to query the pet collection with the owner id than querying it for every pet the owner has
        const userPets = await Pet.find({ owner: user._id}) 
        pets = userPets.map((doc) => {
          const pet = doc.toObject()
          pet._id = pet._id.toString()
          pet.owner = pet.owner.toString()
          return pet
        })
    }
    return { props: { pets} }
}

export default MyPets