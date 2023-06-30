import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import NavbarAdmin from '../components/NavbarAdmin';

export default function UpdateCategoryAdmin() {
  // set title in tab header browser
  const title = 'Category admin';
  document.title = 'DumbMerch | ' + title;
  
  // category state initialization
  const [category, setCategory] = useState({ name: '' });

  // navigation initialization
  let navigate = useNavigate();

  // params initialization
  const { id } = useParams();

  // Fetching category data by id from database
  let { data: categoryData } = useQuery('categoryUpdateCache', async () => {
    const response = await API.get('/category/' + id);
    return response?.data?.data?.name;
  });

  // to check whether the category value exists or is empty
  useEffect(() => {
    if (categoryData) {
      setCategory({ name: categoryData });
    }
  }, [categoryData]);

  // to capture the latest category value from the input form
  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  // updating data on the server
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      // Configuration headers
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      // The data body that has been converted to json will be added to the server
      const body = JSON.stringify(category);
  
      // Updating category data to server
      await API.patch('/category/' + id, body, config);
  
      // navigation action after adding data
      navigate('/category-admin');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <NavbarAdmin title={title} />

      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4">Edit Category</div>
          </Col>
          
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <input onChange={handleChange} value={category.name} placeholder="category" className="input-edit-category mt-4" />

              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Save
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
