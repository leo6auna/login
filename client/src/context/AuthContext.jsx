import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest, verifyToken} from "../api/auth";
import Cookies from 'js-cookie';

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

    //Limpiar errores luego de 3 segundos
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
        setUser(res.data);
        setIsAuthenticated(true);
       } catch (error) {
        // console.log(error.response)
        setErrors(error.response.data)
       } 
    };

    const signin = async(user)=>{
        try {
            const res = await loginRequest(user);
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
        

    };

    const logout = () =>{
        Cookies.remove('token');
        setIsAuthenticated(false)
        setUser(null)
    }

   
    useEffect(()=>{
        const checkLogin = async () =>{            
            const cookies = await Cookies.get();
            // console.log(cookies.token)
             if(!cookies.token){
                 setIsAuthenticated(false)
                 setLoading(false)
                 return 
             };
            
            try {
                const res = await verifyToken(cookies.token);
                if(!res.data){
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setIsAuthenticated(false)
                setLoading(false)
            }
         };
        checkLogin();
    }, [])



    return(
        <AuthContext.Provider value={
            {
                user, 
                signup, 
                signin, 
                logout,
                isAuthenticated, 
                errors,
                loading,
            }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext