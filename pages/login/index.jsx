import LoginForm from '../../components/LoginForm'
import Header from '../../components/Header'
const Login = ({user = {}}) =>{
    return(
        <>
            <Header user= {user}/>
            <LoginForm/>
        </>
    )
}

export default Login