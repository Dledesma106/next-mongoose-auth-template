import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Pet from '../../models/Pet'
import isUsersPet from '../../lib/isUsersPet'
import getUserServer from '../../lib/getUserServerSide'
import { ReducedUser } from '../../context/userContext/interfaces'
import {PetInterface} from '../../models/interfaces'
import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest } from 'next'

interface props {
  pet:PetInterface;
  user:ReducedUser;
}

/* Allows you to view pet card info and delete pet card*/
const PetPage = ({ pet, user }:props) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const petID = router.query.id

    try {
      await fetch(`/api/pets/${petID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the pet.')
    }
  }

  return (
    <>
        <div style={{display:'flex', justifyContent:'space-evenly'}}>
            <div key={pet._id.toString()} >
                <div className="card">
                <img src={pet.image_url} />
                <h5 className="pet-name">{pet.name}</h5>
                <div className="main-content">
                    <p className="pet-name">{pet.name}</p>
                    <p className="owner">Owner: {pet.owner_name}</p>

                    {/* Extra Pet Info: Likes and Dislikes */}
                    <div className="likes info">
                    <p className="label">Likes</p>
                    <ul>
                        {pet.likes.map((data, index) => (
                            <li key={index}>{data} </li>
                            ))}
                    </ul>
                    </div>
                    <div className="dislikes info">
                    <p className="label">Dislikes</p>
                    <ul>
                        {pet.dislikes.map((data, index) => (
                            <li key={index}>{data} </li>
                            ))}
                    </ul>
                    </div>

                    <div className="btn-container">
                    {isUsersPet(user, pet) && <Link href="/my-pets/[id]/edit" as={`/my-pets/${pet._id}/edit`}>
                        <button className="btn edit">Edit</button>
                    </Link>}
                    {isUsersPet(user, pet) && <button className="btn delete" onClick={handleDelete}>
                        Delete
                    </button>}
                    </div>
                </div>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    </>
  )
}

export async function getServerSideProps(context:GetServerSidePropsContext) {
  let id:string | string[] | undefined= undefined
  if(context.params){
    id = context.params.id
  }
  
  const {req} = context

  await dbConnect()
  
  const pet = await Pet.findById(id).lean()
  pet._id = pet._id.toString()
  pet.owner = pet.owner.toString()
  const user = await getUserServer(req as NextApiRequest)
  return { props: { pet , user} }
}

export default PetPage
