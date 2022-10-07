import dbConnect from '../lib/dbConnect'
import Pet from '../models/Pet'
import PetCard from '../components/PetCard'
import { useUser } from '../hooks/useUser'
import {PetInterface} from '../models/interfaces'
import { GetServerSidePropsContext } from 'next'

interface props {
  pets:PetInterface[]
}

const Index = ({ pets }:props) => {
  return(<>
    {/* Create a card for each pet */}
    <h2 style={{textAlign:'center'}}>Every Pet on this App!</h2>
    <div className="grid wrapper">
      {pets.map((pet) => (<PetCard key={pet._id.toString()} pet={pet}/>))}
    </div>
  </>)
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps({req,res}:GetServerSidePropsContext) {
  await dbConnect()

  /* find all the pets in our database */
  const allPets = await Pet.find({})
  const pets = allPets.map((doc) =>
    {
      const pet = doc.toObject()
      pet._id = pet._id.toString()
      pet.owner = pet.owner.toString()
      return pet
    }
  )

  return { props: { pets} }
}

export default Index
