import dbConnect from '../lib/dbConnect'
import Pet from '../models/Pet'
import PetCard from '../components/PetCard'
/* import * as cookies from 'cookies-next'
import { useState } from 'react'
import User from '../models/User' */

const Index = ({ pets, user }) => {
  
  return(<>
    {/* Create a card for each pet */}
    {pets.map((pet) => (<PetCard key={pet._id} pet={pet}/>))}
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
    return pet
  })
  let user = ''
  if (req.cookies.username){
    user = req.cookies.username
  }

  return { props: { pets: pets,  user: user } }
}

export default Index
