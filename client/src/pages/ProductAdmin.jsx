import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import ShowMoreText from 'react-show-more-text';
import rupiahFormat from 'rupiah-format';
import DeleteData from '../components/modal/DeleteData';
import NavbarAdmin from '../components/NavbarAdmin';
import imgEmpty from '../assets/empty.svg';

export default function ProductAdmin() {
  // set title in tab header browser
  const title = 'Product admin';
  document.title = 'DumbMerch | ' + title;
  
  // navigation initialization
  let navigate = useNavigate();

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);

  // function open and close modal 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function handle button delete before show modal
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  // execute delete data updating by checked from conditional and close modal 
  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  // fetch products data from server using useQuery
  let { data: products, refetch } = useQuery('productsAdminCache', async () => {
    const response = await API.get('/products');
    return response?.data?.data;
  });

  // function navigate after click button add product
  const addProduct = () => {
    navigate('/add-product');
  };

  // function navigate after click button update product
  const handleUpdate = (id) => {
    navigate('/update-product/' + id);
  };

  // function delete specific data to server
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  // Do a refetch after a data change from server 
  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <>
      <NavbarAdmin title={title} />

      <Container className="py-5">
        <Row>
          <Col xs="6">
            <div className="text-header-category mb-4">List Product</div>
          </Col>
          <Col xs="6" className="text-end">
            <Button onClick={addProduct} className="btn-dark" style={{ width: '100px' }}>
              Add
            </Button>
          </Col>
          
          <Col xs="12">
            {products?.length !== 0 ? (
              <Table striped hover size="lg" variant="dark">
                <thead>
                  <tr>
                    <th width="1%" className="text-center">No</th>
                    <th className="text-center">Photo</th>
                    <th>Product Name</th>
                    <th>Product Desc</th>
                    <th>Price</th>
                    <th className="text-center">Qty</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                
                <tbody>
                  {products?.map((item, index) => (
                    <tr key={index}>
                      <td className="align-middle text-center">
                        {index + 1}
                      </td>

                      <td className="align-middle">
                        <img src={item.image} style={{ width: '80px', height: '80px', objectFit: 'cover' }} alt={item.name} />
                      </td>

                      <td className="align-middle">
                        {item.name}
                      </td>
                      
                      <td className="align-middle">
                        <ShowMoreText lines={1} more="show" less="hide" className="content-css" anchorClass="my-anchor-css-class" expanded={false} width={280}>
                          {item.desc}
                        </ShowMoreText>
                      </td>

                      <td className="align-middle">
                        {rupiahFormat.convert(item.price)}
                      </td>

                      <td className="align-middle">{item.qty}</td>

                      <td className="align-middle">
                        <Button onClick={() => handleUpdate(item.id)} className="btn-sm btn-success me-2" style={{ width: '135px' }}>
                          Edit
                        </Button>

                        <Button onClick={() => handleDelete(item.id)} className="btn-sm btn-danger" style={{ width: '135px' }}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center pt-5">
                <img src={imgEmpty} className="img-fluid" style={{ width: '40%' }} alt="empty" />
                <div className="mt-3">No data product</div>
              </div>
            )}
          </Col>
        </Row>

      </Container>
      <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />
    </>
  );
}
