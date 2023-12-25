import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [credential, setCredential] = useState({
        email: "",
        password: ""
    })
    let navigate = useNavigate();
    const host = "http://localhost:5000"
    const handleSubmit = async (e)=>{
        e.preventDefault();
        // calling an api
        const response = await fetch(`${host}/api/auth/login`,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
                body: JSON.stringify({email: credential.email, password: credential.password})
          });
        const json = await response.json()
        console.log(json)
        if(json.success)
        {
            //Save the auth token and rediredt
            localStorage.setItem('token', json.authtoken)
            navigate("/");
            props.showAlert("Logged In", "success");
        }
        else{
            props.showAlert(json.error, "danger");
        }
    }
    const onChange = (e) =>{
        setCredential({
            ...credential, [e.target.name]: e.target.value
        })
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credential.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credential.password}
            onChange={onChange}
          />
        </div>
        <div className="mb-3 form-check">
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default Login;
