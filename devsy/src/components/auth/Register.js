import React, { Fragment,useState } from "react";
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alert'
import PropTypes from 'prop-types'
import {register} from '../../actions/auth'



const Register = ({setAlert,register,isAuthenticated}) => {
    const [formData,setFromData] = useState({
        name:'',
        email:'',
        password:'',
        cpass:''
    })

    const {name,email,password,cpass} = formData
    
    const onNameChange = (e) => setFromData({...formData,[e.target.name]:e.target.value})
 
    const onSubmit = async (e) => {
        e.preventDefault()

        if(password !== cpass){
            setAlert("Passwords do not match",'danger')
        }else{
            register({name,email,password})

            // const newUser = {
            //     name,
            //     email,
            //     password,

            // }

            // try {
            //     const config = {
            //         headers:{
            //             'Content-Type':'application/json'
            //         }
            //     }
            //     const body = JSON.stringify(newUser)

            //     const res = await axios.post('/api/users',body,config)
            //     console.log(res.data);
            // } catch (e) {
            //     console.error(e.response.data);
                
            // }
        }
    }

    if (isAuthenticated) {
      return <Redirect to='/dashboard'/>
    }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="Name" 
          name="name" 
          //required 
          value={name}
          onChange={e=>onNameChange(e)}
          />
        </div>
        <div className="form-group">

          <input type="email" 
          placeholder="Email Address" 
          name="email" 
          //required
          value={email}
          onChange={e=>onNameChange(e)}
          />

          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            //required
            value={password}
          onChange={e=>onNameChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpass"
            //minLength="6"
            value={cpass}
          onChange={e=>onNameChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.prototypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state,props) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{setAlert,register})(Register)
