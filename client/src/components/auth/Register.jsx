import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import { Alert } from 'react-bootstrap';

export default function Register() {
  // set title in tab header browser
  const title = 'Register';
  document.title = 'DumbMerch | ' + title;

  // as a container for login information messages
  const [message, setMessage] = useState(null);

  // as a container for register information from input text
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Handle change data register on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // function submit register using useMutation
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      
      // add data to the server
      await API.post('/register', form);
    
      const alert = (
        <Alert variant="success" className="py-1">
          Register success!
        </Alert>
      );

      // to show success alert
      setMessage(alert);

      // clearing input text after register
      setForm({
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed to register!
        </Alert>
      );

      // to show failed alert
      setMessage(alert);
    }
  });

  return (
    <div className="d-flex justify-content-center">
      <div className="card-auth p-4">
        <div style={{ fontSize: '36px', lineHeight: '49px', fontWeight: '700' }} className="mb-2">
          Register
        </div>

        {message && message}

        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3 form">
            <input type="text" placeholder="Name" name="name" onChange={handleChange} value={form.name} className="px-3 py-2" />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} value={form.email} className="px-3 py-2 mt-3" />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={form.password} className="px-3 py-2 mt-3" />
          </div>
          
          <div className="d-grid gap-2 mt-5">
            <button type="submit" className="btn btn-login">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
