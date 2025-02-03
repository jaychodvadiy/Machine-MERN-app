import React, { useState } from 'react';
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setCredentials((prev)=>({...prev, [e.target.id]: e.target.value}))
  }
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/registeruser`,{
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(credentials)
      })
      const result = await res.json();
      navigate("/login");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-4 "></div>
        <div className="col-md-4 ">
          <form className='' onSubmit={handleSubmit}>
            <input type="text" className='form-control mt-2' placeholder='Enter your Name' id='name' onChange={handleChange} />
            <input type="email" id="email" className='form-control mt-2' placeholder='Enter your Email' onChange={handleChange}/>
            <input type="password" id="password" className='form-control mt-2' placeholder='Enter your Password' onChange={handleChange}/>
            {/* <input type="test" id="phone" className='form-control mt-2' placeholder='Enter your Phonenumber' onChange={handleChange}/> */}
            <button className='btn btn-primary mt-2' type='submit'>Register</button>
          </form>
        </div>
        <div className="col-md-4 "></div>
      </div>
    </div>
    </>
  )
}

export default Register