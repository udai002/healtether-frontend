import { Link, useNavigate  } from "react-router-dom"
import {useState , useEffect, useRef} from 'react'
import Cookies from "js-cookie"


const Login  = ()=>{

    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')
    const [loginError , setLoginError] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        const token = Cookies.get("jwt_token")
        if(token){
            navigate('/')
        }
    },[])

    const ref = useRef()

    const onSubmitBtn = e=>{
        if(username && password){
            ref.current.textContent = "Loading..."
        }
    }

    const onUserLogin = async ()=>{
        console.log(username)
        console.log(password)
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({username, password})
        }
        await fetch('https://healtether-backend.onrender.com/api/users/login' , options)
        .then(res=>{
            if(res.ok === false){
                console.log('invalid credientials')
                setLoginError(true)
            }
            return res.json()})
        .then(data=>{
            const {jwtToken} = data
            Cookies.set("jwt_token" , jwtToken)
            if(jwtToken){
                navigate('/')
                console.log("you are before navigate component")
            }else{
                setLoginError(true)
            }

        })
        .catch((e)=>console.log(e))
      
    }

    const OnFormSubmit = e=>{
        e.preventDefault();
        onUserLogin();
    }

    
    return <><div className="flex flex-row justify-center items-center h-[100vh]">
        <form className="border-2 md:p-20 p-10 flex flex-col justify-stretch " onSubmit={OnFormSubmit}>
            <h1 className="text-center text-3xl mb-10 font-bold">Login</h1>
            <div>
                <label htmlFor="username" className="">Username</label> <br />
                <input type="text" className="py-2 px-3 mb-8" id="username" placeholder="Enter Username" onChange={(e)=>setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label> <br />
                <input type="text"  className="py-2 px-3 mb-8" id="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} />
            </div>
            {loginError?<p className="text-red-800">Invalid Credientials</p>:""}
            <button type="submit" className="bg-blue-900 text-white px-4 py-2 mb-1" onClick={onSubmitBtn} ref={ref}>Login</button>
            <p className="underline"><Link to='/signup'>Create a new Account</Link></p>
        </form>

       
    </div>
    <div className="text-center">
        <h1 className="font-bold text-4xl mb-1">Sample login details</h1>
        <p>Username:udai</p>
        <p>Password:udai12</p>
    </div>
    </>
}

export default Login