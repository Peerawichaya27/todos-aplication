import {useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext'
function LoginComponent(){

    const [username,setUsername] = useState('in28minutes')
    const [Password,setPassword] = useState('')
    const [showErrorMessage,setShowErrorMessage] = useState(false)
    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    async function handleSubmit(){
        if(await authContext.login(username,Password)){
            navigate(`/welcome/${username}`)
        }else{
            setShowErrorMessage(true)
        }
    }

    return(
        <div className="Login">
            <h1>Time to Login!</h1>
            {showErrorMessage&&<div className='errorMessage'>Authenticated Failed. Please check your credentrials</div>}
            <div className="LoginFrom">
                <div>
                    <label>User Name:</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="Password" name="Password" value={Password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent