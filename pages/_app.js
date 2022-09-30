import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Header from '../components/Header'
import { UserProvider } from '../context/userContext'

function MyApp({Component, pageProps}) {

  return (  
    <>
      <Head>
        <title>Pet Care App</title>
      </Head>
      <UserProvider>
        <Header/>
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}

/* MyApp.getInitialProps = async(appContext)=>{
  //appContext.ctx.req? console.log(appContext.ctx.req):console.log('noreq')
  //console.log(Router)
  const {req} = appContext.ctx
  const appProps = await App.getInitialProps(appContext)
  if(req){
  //  const user = await isoGetUser(req)
    const fullUrl = req.headers.referer
    //const protocol = req.protocol
    
    return {...appProps, fullUrl}
  }
  return{...appProps}
} */

export default MyApp
