

import axios from 'axios';
import React from 'react';
// import { useQuery } from 'react-query';
import TableBody from './TableBody';
import { useNavigate } from 'react-router-dom';
const Home = () => {

    const [data, setData] = React.useState(null);

    // the fetch function used to get all the data from our http://localhost:5000
    const fetch = async () => {
        const data = await axios.get('http://localhost:5000/health').then((res)=>res?.data);
        setData(data);
    }

 

    // pass the fetch function in the arguments of useQuery to simplify the code
    // const { data } = useQuery('list', fetch);

    React.useEffect(()=>{
        fetch();
    },[])


    const deleteHealth = async (id) => {
        await axios.delete(`http://localhost:5000/health/${id}`)
            .then(res=> {
                console.log(res?.data);
                const health = data?.filter((h => {
                    return h._id !== id
                }));
                setData(health);
            })
            .catch(err=> console.log('http delete error: '+err));
    }
    const navigate = useNavigate()
    const updateHealth = async (id) => {
       navigate(`/edit/${id}`)
    }

    return (
        <div className='container mt-4'>
            <h1>Home</h1>
            <table className="table table-striped table-bordered table-sm table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">fullname</th>
                        <th scope="col">temperature</th>
                        <th scope="col">email</th>
                        <th scope="col">phone</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((health)=>{
                         return  <TableBody key={health._id} deleteHealth={deleteHealth} updateHealth={updateHealth} {...health}   />
                    })}
                
                </tbody>
            </table>

        </div>
    );
}

export default Home;

