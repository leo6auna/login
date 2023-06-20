import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const {isAuthenticated, logout, user} = useAuth()
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
        <Link to={'/'}>
            <h1 className="text-2xl font-bold ">Gestor de tareas</h1>
        </Link>
        <ul className="flex gap-x-2">
            {isAuthenticated? (
                <>
                <li>
                    Bienvenido {user.username} !!
                </li>
                <li>
                    <Link to={'/add-task'} className="bg-lime-600 px-4 py-1 rounded-sm">Nueva tarea</Link>
                </li>
                <li>
                    <Link to={'/'} onClick={()=>{logout()}} className="bg-red-600 px-4 py-1 rounded-sm">Cerrar Sesión</Link>
                </li>

                </>
            ):(
                <>
                <li>
                    <Link to={'/login'} className="bg-white text-blue-600 px-4 py-1 rounded-sm">Login</Link>
                </li>
                <li>
                    <Link to={'/register'} className="bg-blue-600 px-4 py-1 rounded-sm">SignUp</Link>
                </li>
                </>
            )}


            
            
        </ul>
    </nav>

  )
}

export default Navbar