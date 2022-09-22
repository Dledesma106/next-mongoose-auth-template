import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'

/* import User from '../models/User'
import dbConnect from '../lib/dbConnect'
 */
function MyApp({ Component, pageProps }) {
  
  
  
  return (
    <>
      <Head>
        <title>Pet Care App</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

/* export async function getServerSideProps({req,res}) {

  await dbConnect()
  let user = ''
  if (req.cookies.username){
    console.log('intento buscar el user')
    username = req.cookies.username
    user = await User.findOne({username:username})
    console.log(user.firstName)
  }

  return { props: { user: user } }
} */

export default MyApp
