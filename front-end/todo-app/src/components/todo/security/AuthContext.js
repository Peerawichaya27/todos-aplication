import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({children}){

    const[isAuthenticated, setAuthenticated] = useState(false)

    const[username, setUsername] = useState(null)

    const[token, setToken] = useState(null)

//    function login(username, Password){
//         if(username==='in28minutes'&&Password==='dummy'){
//             setAuthenticated(true)
//             setUsername(username)
//             return true
//         }else{
//             setAuthenticated(false)
//             setUsername(null)
//             return false
//     }
//    }

    // async function login(username, Password){

    //     const baToken = 'Basic ' + window.btoa(username + ":" + Password)

    //     try{
    //         const response = await executeBasicAuthenticationService(baToken)

    //         if(response.status==200){
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting and adding a token')
    //                     config.headers.Authorization=baToken
    //                     return config
    //                 }
    //             )
    //             return true
    //         }else{
    //             logout()
    //             return false
    //         }
    //     }catch(error){
    //         logout()
    //         return false
    //     }
    // }

    async function login(username, Password){


        try{
            const response = await executeJwtAuthenticationService(username,Password)

            if(response.status==200){
                const JwtToken = 'Bearer ' + response.data.token
                setAuthenticated(true)
                setUsername(username)
                setToken(JwtToken)
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization=JwtToken
                        return config
                    }
                )
                return true
            }else{
                logout()
                return false
            }
        }catch(error){
            logout()
            return false
        }
    }

    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,username,token}}>
            {children}
        </AuthContext.Provider>
    )
}