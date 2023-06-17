import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest} from "../api/auth";
import Cookies from 'js-cookie';
import { Await } from "react-router-dom";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error ("useAuth must be used within an authProvider");
    } 
    return context
}
export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if(errors.length > 0){
            const timer = setTimeout(()=>{
                setErrors([])
            }, 3000)
            return ()=> clearTimeout(timer)
        }
    }, [errors])

    const signup = async (user)=>{
       try {
        const res = await registerRequest(user);
        console.log(res.data);
        setUser(res.data);
        setIsAuthenticated(true);
       } catch (error) {
        // console.log(error.response)
        setErrors(error.response.data)
       } 
    };

    const signin = async(user)=>{
        try {
            const res = await loginRequest(user)
            console.log(res)
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
        

    };

   

    useEffect(()=>{
        const checkLogin = async () =>{            
            const tokenism = await Cookies.get('token');
            console.log('el token')
            console.log(tokenism)
            // if(cookies.token) console.log('comete una cookie outo')
            //  if(!cookies.token){
          
            //      setIsAuthenticated(false)
            //      setLoading(false)
            //      return setUser(null)
            //  }
            // console.log(cookies)
            
            // try {
            //     console.log('llegamos al try')
            //     const res = await verifyTokenRequest(cookies.token);
            //     console.log('res.data', res.data)
            //     if(!res.data){
            //         setIsAuthenticated(false)
            //         setLoading(false)
            //         return
            //     }
            //     console.log('parte baja del try')
            //     setIsAuthenticated(true)
            //     setUser(res.data)
            //     setLoading(false)
            // } catch (error) {
            //     console.log('Estamos en el catch')
            //     console.log(error)
            //     setIsAuthenticated(false)
            //     setUser(null)
            // }
         }
        checkLogin()
    }, [])



    return(
        <AuthContext.Provider value={
            {
                signup, 
                signin, 
                user, 
                isAuthenticated, 
                errors,
                loading
            }}>
            {children}
        </AuthContext.Provider>
    )
}