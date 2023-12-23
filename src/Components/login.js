import React, { useState, useContext } from "react";
import userApis from "../Apis/userApis";
import authContext from "../Context/authContext";
import { useNavigate } from "react-router-dom";



const Login = (props) => {



    let [logged, setLogged] = useState({
        username: "",
        password: ""
    })
    let [error, setError] = useState("")

    let { userData, setUserData } = useContext(authContext);

    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();

        if (!logged.username && !logged.password) {
            return setError("Please fill the all the mandetory ")
        }
        console.log(logged)
        userApis.post('/auth/login', logged)
            .then((res) => {
                console.log(res.data)
                setUserData(res.data)
                navigate("/Profile")
            })
            .catch((err) => console.log(err))

    }

    return (
        <div>
            <div className="form">

                <form className="data">

                    <div className="data-1">
                        <p>Welcome back! <img src="https://img.icons8.com/fluency/48/so-so.png" alt="hands" width={20} height={20}/> </p>
                        <h1>Sign in to your account</h1>
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="username"
                            onChange={(e) => setLogged({ ...logged, username: e.target.value })}
                        />
                        <br /><br />

                        <label htmlFor="password">password</label>
                        <input type="password" placeholder="Password"
                            onChange={(e) => setLogged({ ...logged, password: e.target.value })}
                        />
                        <br /><br />
                        <button className="btn" type="submit" onClick={handleLogin}>Continue</button>
                        <p style={{marginLeft:"130px", color:"blue"}}>Forget Your Password?</p>
                    </div>
                    <div className="dontHave">
                        <p>Don't have an account? <span style={{color:"blue"}}>Sign Up</span></p>
                    </div>
                    

                </form>
                {props.children}
            </div>


        </div>
    )
}

export default Login;