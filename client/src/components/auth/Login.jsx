import { useContext, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

import { API, setAuthToken } from '../../config/api';

export default function Login() {
  // set title in tab header browser
  const title = 'Login';
  document.title = 'DumbMerch | ' + title;
  
  // navigation initialization
  let navigate = useNavigate();

  // initialize dispatch from context
  const [_, dispatch] = useContext(UserContext);

  // as a container for login information messages
  const [message, setMessage] = useState(null);

  // as a container for login information from input text
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // Handle change data login on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // function submit user login using useMutation
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Insert data for login process, you can also make this without any configuration, because axios would automatically handling it.
      const response = await API.post('/login', form);


      // Send data to useContext
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response?.data?.data,
      });

      // Status check is admin or customer
      if (response.data.data.role === 'admin') {
        navigate('/complain-admin');
      } else {
        navigate('/');
      }

      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
    }
  });

  return (
    <div className="d-flex justify-content-center">
      <div className="card-auth p-4">
        <div style={{ fontSize: '36px', lineHeight: '49px', fontWeight: '700' }} className="mb-3" >
          Login
        </div>

        {message && message}

        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3 form">
            <input type="email" placeholder="Email" name="email" onChange={handleChange} className="px-3 py-2 mt-3" />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} className="px-3 py-2 mt-3" />
          </div>

          <div className="d-grid gap-2 mt-5">
            <button className="btn btn-login">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
