import React from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";


function Add() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({firstname:"",
  lastname:"",
  email:"",
  phone:"",
  country:"",
  about:""});
  const navigate = useNavigate();

  const onSubmit = (formdata) => {
     
      let postdata = {data:[formdata]};  
      fetch(`${import.meta.env.VITE_API_URL}/user/add`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postdata),
      }).then((response) => response.json()).then((data) => {
          console.log(data);
          toast(data.response);
          navigate('/');
      }).catch((err) => {
        console.log(err);
      });
  }; // your form submit function which will invoke after successful validation

  
  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <div style={{'display':'flex'}}>
      <h1>Add User</h1>
      </div>
      <Link to={"/"} className='btn btn-success' >list</Link>
      <br/>
      <br/>
      
      <div className="form-row">
        <div className="form-group col-md-6">
        <label>First Name</label>
        <input
          {...register("firstname", {
            required: true,
            pattern: /^[A-Za-z]+$/i
          })}
          className="form-control"
        />
        {errors?.firstname?.type === "required" && <p>This field is required</p>}
        </div>
     
        <div className="form-group col-md-6">
        <label>Last Name</label>
        <input {...register("lastname", { required: true, pattern: /^[A-Za-z]+$/i })} className="form-control" />
        {errors?.lastname?.type === "required" && <p>This field is required</p>}
        {errors?.lastname?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        </div>
      </div>

      <div className="form-row">

      <div className="form-group col-md-6">
      <label >Email</label>
      <input {...register("email", { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i })}  className="form-control"/>
      {errors?.email?.type === "required" && <p>This field is required</p>}
      {errors?.email?.type === "pattern" && (
        <p>Valid Email only</p>
      )}
      </div>

      <div className="form-group col-md-6">
      <label >Phone</label>
      <input
        {...register("phone", {
          required: true,
          pattern: /^[0-9]+$/i
        })}
        className="form-control"
      />
      {errors?.phone?.type === "required" && <p>This field is required</p>}
      </div>
      
      </div>

      <div className="form-row">  
      <div className="form-group col-md-6">
      <label>country</label>
      <input
        {...register("country", {
          required: true
        })}
        className="form-control"
      />
      {errors?.country?.type === "required" && <p>This field is required</p>}
      </div>
      <div className="form-group col-md-6">
      <label >about</label>
      <input
        {...register("about", {
          required: true
        })}
        className="form-control"
      />
      {errors?.about?.type === "required" && <p>This field is required</p>}

      </div>
      </div>
      <div className="form-group col-md-12" style={{"display":"flex","justifyContent":"center"}}>
      <input type="submit" className="btn btn-primary" value={'Add'} />
      </div>
    </form>
  );
}

export default Add