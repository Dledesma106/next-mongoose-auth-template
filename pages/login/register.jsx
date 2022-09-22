import Header from '../../components/Header'
import RegisterForm from '../../components/RegisterForm'

const Register = ({user = {}}) =>{
    return(
        <>
            <Header user={user}/>
            <RegisterForm/>
        </>
    )
}



export default Register