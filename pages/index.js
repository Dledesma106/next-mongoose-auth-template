import dbConnect from '../lib/dbConnect'
import getUser from '../lib/getUser'
import Pet from '../models/Pet'
import PetCard from '../components/PetCard'
//import User from '../models/User'
import Header from '../components/Header'
/* import * as cookies from 'cookies-next'
import { useState } from 'react'
import User from '../models/User' */

const Index = ({ pets, user}) => {
  
  return(<>
    {/* Create a card for each pet */}
    <Header user={user}/>
    <h2>Every Pet on this App!</h2>
    <div className="grid wrapper">
      {pets.map((pet) => (<PetCard key={pet._id} pet={pet}/>))}
    </div>
  </>)
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps({req,res}) {
  await dbConnect()

  /* find all the data in our database */
  const allPets = await Pet.find({})
  const pets = allPets.map((doc) => {
    const pet = doc.toObject()
    pet._id = pet._id.toString()
    pet.owner = pet.owner.toString()
    return pet
  })
  const user = await getUser(req)

  return { props: { pets: pets,  user: user } }
}

export default Index
