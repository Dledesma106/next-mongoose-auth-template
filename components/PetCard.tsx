import Link from "next/link"
import { useUser } from "../context/userContext"


export default function PetCard({pet, isMyPets = false}){

    const {user, isLoggedIn} = useUser()

    return(
        <div key={pet._id}>
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
                {isLoggedIn() && isMyPets &&<Link href="/my-pets/[id]/edit" as={`/my-pets/${pet._id}/edit`}>
                    <button className="btn edit">Edit</button>
                </Link>}
                <Link href="/pet/[id]" as={`/pet/${pet._id}`}>
                    <button className="btn view">View</button>
                </Link>
                </div>
            </div>
            </div>
        </div>
    )
}