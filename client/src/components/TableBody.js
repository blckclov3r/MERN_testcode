import React from 'react';

const TableBody = ({_id,fullname,temperature,email,phone,deleteHealth,updateHealth}) =>(
    <tr>
        <th scope="row">{_id}</th>
        <td >{fullname}</td>
        <td>{temperature}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td className=''>
            <button className='btn btn-warning mx-2' onClick={()=>{updateHealth(_id)}}>Update</button>
            <button className='btn btn-danger' onClick={()=>{deleteHealth(_id)}}>Delete</button>
            </td>

    </tr>
)


export default TableBody;
