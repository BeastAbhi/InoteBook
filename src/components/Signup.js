import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup(props) {
  const host = "http://localhost:5000";
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Call an api
    if (credential.password === credential.cpassword) {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credential.name,
          email: credential.email,
          password: credential.password,
          cpassword: credential.cpassword,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        //Save the auth token and rediredt
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Logged In", "success");
      } else {
        props.showAlert(json.error, "danger");
      }
    } else {
        props.showAlert("Both password must be same", "danger");
    }
  };
  const onChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            value={credential.name}
            onChange={onChange}
            required
          />
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
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credential.password}
            onChange={onChange}
            minLength={5}
            required
          />
          <label htmlFor="password" className="form-label">
            Conform Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3 form-check"></div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <div>
        Have an account
        <Link to= "/login"> Login</Link>
        </div>
      </form>
    </>
  );
}

export default Signup;
