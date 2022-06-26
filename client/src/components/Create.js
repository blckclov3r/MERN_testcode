

import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate  } from 'react-router-dom';
const Create = () => {

    const [fullname, setFullname] = useState('');
    const[ temperature, setTemperature ]= useState(0);
    const [email, setEmail ]= useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate()

    const submitFn  = async (e) =>{
       e.preventDefault();
        await axios.post('http://localhost:5000/health/create',{
            fullname: fullname,
            temperature: temperature,
            email: email,
            phone: phone
        }).then(res => {
            console.log(res.data);
            navigate('/');
        })
        .catch(err => console.log('Post Error '+err))
    }
    
    return (
        <div className='container w-50 mt-5'>
            <h1>Create</h1>
            <form onSubmit={(e)=>{submitFn(e)}}>
            <div className='form-group mb-3'>
                <label className='form-label'>Full Name</label>
                <input type="text" className='form-control' value={fullname} onChange={(e)=>{setFullname(e.target.value)}} required />
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Temperature</label>
                <input type="number" className='form-control' value={temperature} onChange={(e)=>{setTemperature(e.target.value)}} required />
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Email</label>
                <input type="text" className='form-control' value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
            </div>
            <div className='form-group'>
                <label className='form-label'>Phone</label>
                <input type="text" className='form-control' value={phone} onChange={(e)=>{setPhone(e.target.value)}} required />
            </div>
            <button type='submit' className='btn btn-primary mt-3' >Save</button>
            </form>
        </div>
    );
}

export default Create;
