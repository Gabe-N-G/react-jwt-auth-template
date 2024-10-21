// SignupForm.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => { //usually used in error handling, so we can send error codes to the front end.
    setMessage(msg);
  };

  //generic GA handlechange
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//chad raul handlechange
//use prev state and destructuring
//prev state because calls are async and may mess it up.
const handleChange = (e) => {
    const {name, value} = e.target

    setFormData((prevFormData)=>({
        ...prevFormData,
        [name]: value,
    }))
}


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const user = await authService.signin(formData); // TODO: build signin service function

        props.setUser(user);
        navigate('/');
    } catch (error) {
        updateMessage(err.message);
    }
    updateMessage('');
    console.log(formData); // this line will print the form data to the console
    // connect to 
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf); // validates if there is a name and a password, and the password = the password confirmation.
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="name"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignupForm;
