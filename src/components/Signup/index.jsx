import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from 'react'
import Cookies from "js-cookie"

const Signup = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [matchError, setMatchError] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get("jwt_token")
        if (token) {
            navigate('/')
        }
    }, [])

    const ref = useRef()

    const onSubmitBtn = e => {
        if (username && password) {
            ref.current.textContent = "Loading..."
        }
    }

    const onUserLogin = async () => {

        if (password === confirmPassword) {
            setMatchError(false)
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ username, email, password })
            }
            await fetch('https://healtether-backend.onrender.com/api/users/register', options)
                .then(res => {
                    if (res.ok === false) {
                        console.log('Somthing went wrong , please Try again')
                        setLoginError(true)
                    }
                    return res.json()
                })
                .then(data => {
                    const { jwtToken } = data
                    if (jwtToken) {
                        Cookies.set("jwt_token", jwtToken)
                        console.log("you are before navigate component")
                        navigate('/')
                    }


                })
                .catch((e) => console.log(e))
        } else {
            setMatchError(true)
        }


    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        onUserLogin()
    }


    return <div className="flex flex-row justify-center items-center h-[100vh]">
        <form className="border-2 md:p-20 p-10 flex flex-col justify-stretch " onSubmit={onFormSubmit}>
            <h1 className="text-center text-3xl mb-10 font-bold">Create a Account</h1>
            <div className="flex flex-wrap">
                <div className="md:mr-12">
                    <label htmlFor="username" className="">Username</label> <br />
                    <input type="text" className="py-2 px-3 mb-8" id="username" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="username" className="">Email</label> <br />
                    <input type="text" className="py-2 px-3 mb-8" id="username" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <div className="flex flex-wrap"> <div className="md:mr-12">
                <label htmlFor="password">Password</label> <br />
                <input type="password" className="py-2 px-3 mb-8" id="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
                <div>
                    <label htmlFor="password">Confirm Password</label> <br />
                    <input type="password" className="py-2 px-3 mb-8" id="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div></div>

            {matchError ? <p className="text-red-900 ">Password Doesn't match</p> : ""}
            <button type="submit" className="bg-blue-900 text-white px-4 py-2" onClick={onSubmitBtn} ref={ref}>Login</button>
        </form>
    </div>
}

export default Signup