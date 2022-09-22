import PetForm from '../../components/PetForm'
import Header from '../../components/Header'
import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'

const NewPet = ({user}) => {
  const petForm = {
    name: '',
    owner_name: '',
    species: '',
    age: 0,
    poddy_trained: false,
    diet: [],
    image_url: '',
    likes: [],
    dislikes: [],
  }

  return (
    <>
      <Header user={user}/>
      <PetForm formId="add-pet-form" petForm={petForm} />
    </>
  )
}

export async function getServerSideProps({req,res}) {
  await dbConnect()

  /* find the user in the database */

  let user = {}
  if (req.cookies.username){
    const {username, firstName, lastName} = await User.findOne({username:req.cookies.username})
    user = {username, firstName, lastName}
  }

  return { props: { user: user } }
}
export default NewPet
