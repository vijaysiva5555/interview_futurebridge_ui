import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

function List() {
  const [userdata, setUserdata] = useState([]);


  let fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/user/list`)
    .then(response => response.json())
    .then((data) => {
      if (data.status == 1) {
        setUserdata(data.response);
      }
    })
  };

  useEffect(() => {
    fetchData()
  },[])

  let deleteData = async (e) => {
    
    try {
     
      let data = {data:[{
        id:e.target.value
      }]};

    let response = await fetch(`${import.meta.env.VITE_API_URL}/user/delete`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
    fetchData();
  } 
  catch(err) {
    console.log(err);
  };

  }

  
  return (
    <>
    <div className='container'>
      <div style={{'display':'flex'}}>
      <h1>User List</h1>
      </div>
      <Link to={"/add/"} className='btn btn-success'>Add</Link>
      <table className='table'>
        <thead className='thead-light'>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Country</th>
          <th>Phone</th>
          <th>about</th>
          <th>action</th>
        </tr>
        </thead>
        <tbody>
          {
          userdata.length > 0 && userdata.map((value, i) => {
              return (
                <tr scope="row" key={value._id}>
                  <td>{value.firstname}</td>
                  <td>{value.lastname}</td>
                  <td>{value.email}</td>
                  <td>{value.country}</td>
                  <td>{value.phone}</td>
                  <td>{value.about}</td>
                  <td><Link to={"/edit/"+value._id} className='btn btn-primary'>Edit</Link> <button type="button" className='btn btn-danger' value={value._id} onClick={deleteData}>delete</button></td>
                </tr>
              )
            })
          }
        </tbody>
        
      </table>
    </div>
    </>
  )
}

export default List
