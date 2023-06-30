import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { API } from '../config/api';
import NavbarAdmin from '../components/NavbarAdmin';

export default function AddCategoryAdmin() {
  // set title in tab header browser
  const title = 'Category admin';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();
  const [category, setCategory] = useState('');

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      // Configuration
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // The data body that has been converted to json will be added to the server
      const body = JSON.stringify({ name: category });

      // Insert category data to server
      await API.post('/category', body, config);

      // navigation action after adding data
      navigate('/category-admin');
    } catch (error) {
      console.log("add category failed : ", error);
    }
  });

  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4">Add Category</div>
          </Col>

          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <input onChange={handleChange} placeholder="category" value={category} name="category" className="input-edit-category mt-4" />

              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Add
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
