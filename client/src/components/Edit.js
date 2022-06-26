

import React, { useRef } from 'react';
import axios from 'axios'
import { useNavigate, useParams  } from 'react-router-dom';
import {useQuery} from 'react-query'
const Edit = () => {
    
    const { id } = useParams();

    const fetch = async () =>{
        const data = await axios.get(`http://localhost:5000/health/${id}`);
        return data?.data
    }

    const {data} = useQuery(['fetch',id],fetch,{
        keepPreviousData: false,
        initialData: null,
        cacheTime: 0,
    });

 
    const fullnameRef = useRef();
    const temperatureRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

    const navigate = useNavigate()


    const updateFn  = async (e) =>{
       e.preventDefault();
       console.log(fullnameRef)
        await axios.put(`http://localhost:5000/health/edit/${id}`,{
            fullname: fullnameRef.current.value,
            temperature: temperatureRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value
        }).then(res => {
            console.log(res.data);
            navigate('/');
        })
        .catch(err => console.log('Post Error '+err))
    }

    return (
        <div className='container w-50 mt-5'>
            <h1>Edit: {id}</h1>
            <form onSubmit={(e)=>{updateFn(e)}}>
            <div className='form-group mb-3'>
                <label className='form-label'>Full Name</label>
                <input type="text" className='form-control' defaultValue={data?.fullname}  ref={fullnameRef} required />
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Temperature</label>
                <input type="number" className='form-control' defaultValue={data?.temperature} ref={temperatureRef} required />
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Email</label>
                <input type="text" className='form-control' defaultValue={data?.email} ref={emailRef} required />
            </div>
            <div className='form-group'>
                <label className='form-label'>Phone</label>
                <input type="text" className='form-control' defaultValue={data?.phone} ref={phoneRef} required />
            </div>
            <button type='submit' className='btn btn-primary mt-3' >Save</button>
            </form>
        </div>
    );
}

export default Edit;
