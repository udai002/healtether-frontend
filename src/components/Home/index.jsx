import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';

const Home = ()=>{

    const navigate = useNavigate()
    const onLogout = ()=>{
        Cookies.remove('jwt_token')
        navigate('/login')
    }



   useEffect(()=>{
    const jwtToken = Cookies.get('jwt_token')
    if(!jwtToken){
        navigate('/login')
    }
   },[])


    return <div>
        <h1 className="text-center font-bold text-4xl mt-10"> Welcome to HealTether </h1>
        <div className="flex flex-row justify-center mt-10">
       <button className="px-4 py-2 bg-blue-900 text-white" onClick={onLogout}>Logout</button>
        </div>
    </div>
}

export default Home