// SigninForm

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {signin} from '../../services/authService.js'

const SigninForm = ({setUser}) => {
  
  const navigate = useNavigate(); // added this for navigation purposes
  
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  /* old way
  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  */

  const handleChange = (e) => {
    const {name,value} = e.target
    updateMessage('')
    setFormData((prevData)=> ({...prevData, [name] : value}))
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signin(formData); // TODO build signin service function
      setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message + "You messed up!");
    }
  };

  return (
    <main>
      <h1>Log In</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Log In</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SigninForm;
