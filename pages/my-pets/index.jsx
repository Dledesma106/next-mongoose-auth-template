//TODO, view for every pet of the user

import dbConnect from '../../lib/dbConnect'
import Link from 'next/link'
import Pet from '../../models/Pet'
import PetCard from '../../components/PetCard'
import User from '../../models/User'
import Header from '../../components/Header'
/* import * as cookies from 'cookies-next'
import { useState } from 'react'
import User from '../models/User' */

const MyPets = ({pets, user}) => {
  console.log(pets)
  return(
  <>
    {/* Create a card for each pet */}
    <Header user={user}/>
    <h2>My Pets</h2>
    <Link href='/my-pets/new'>
      <a>
        Add a pet!
      </a>
    </Link>
    <div className="grid wrapper">
      {pets.map((pet) => (<PetCard key={pet._id} pet={pet} isMyPets={true}/>))}
    </div>
  </>)
}

//Retrieves pet(s) data from mongodb database 
export async function getServerSideProps({req,res}) {
    await dbConnect()

    //find all the data in our database
    let user = {}
    let pets = []
    if (req.cookies.username){
        const {username, firstName, lastName, _id} = await User.findOne({username:req.cookies.username})
        user = {username, firstName, lastName, _id}
        user._id = user._id.toString()
        //console.log(pets)
        //it's easier to query the pet collection with the owner id than querying it for every pet the owner has
        const userPets = await Pet.find({ owner: _id}) 
        pets = userPets.map((doc) => {
          const pet = doc.toObject()
          pet._id = pet._id.toString()
          pet.owner = pet.owner.toString()
          return pet
        })
        /* userPets = pets.map(async(id) => {
          //pets is an array of objectIds, so for every objectid I should get the corresponding pet
          const _id = id.toString()
          const doc = await Pet.findById(_id)
          const pet = doc.toObject()
          pet._id = pet._id.toString()
          pet.owner = pet.owner.toString()
          return pet
        })  */
    }
    return { props: { pets: pets,  user: user } }
}

export default MyPets