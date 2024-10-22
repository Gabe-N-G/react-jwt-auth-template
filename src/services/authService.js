// src/services/authService.js
import axios from "axios";
const BACKEND_URL = 'http://localhost:3000'; // this is our Express API url, would change later for production.

const signup = async (formData) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/users/signup`,formData)
    console.log(res.data)
    return res
  } catch (err) {
    console.log(err);
    throw err; //throws error  in the form
  }
};

const signin = async (userData) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/users/signin`,userData)
    console.log(res.data)

    if (res.data.error){
      throw new Error(res.data.error)
    }

    if(res.data.token){
      const user = JSON.parse(atob(res.data.token.split('.')[1]))
      return user
    }

  } catch (error) {
    console.log(error)
    throw error
  }
}

export { // or put export next to each variable
  signup, signin
};

// ~with fetch~
// const signup = async (formData) => {
//     try {
//       const res = await fetch(`${BACKEND_URL}/users/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const json = await res.json();
//       if (json.err) {
//         throw new Error(json.err);
//       }
//       return json;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   };