import { Col, Container, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import Masonry from 'react-masonry-css';
import ProductCard from '../components/card/ProductCard';
import Navbar from '../components/Navbar';
import imgEmpty from '../assets/empty.svg';

export default function Product() {
  // set title in tab header browser
  const title = 'Shop';
  document.title = 'DumbMerch | ' + title;

  // initial value for Masonry
  const breakpointColumnsObj = {
    default: 6,
    1100: 4,
    700: 3,
    500: 2,
  };

  // Fetching all products data from database
  let { data: products } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response?.data?.data;
  });

  return (
    <>
      <Navbar title={title} />

      <Container className="mt-5">
        <Row>
          <Col>
            <div className="text-header-product">Product</div>
          </Col>
        </Row>

        <Row className="my-4">
          {products?.length !== 0 ? (
            <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
              {products?.map((item, index) => <ProductCard item={item} key={index} />)}
            </Masonry>
          ) : (
            <Col>
              <div className="text-center pt-5">
                <img src={imgEmpty} className="img-fluid" style={{ width: '40%' }} alt="empty" />
                <div className="mt-3">No data product</div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
