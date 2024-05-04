import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/message";
import { Link, useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
import axios from "axios";
const HomeScreen = () => {
  const { keyword } = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery({ keyword });
  return (
    <>
      {!keyword && <ProductCarousel />}
      {keyword && (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>

          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

// const HomeScreen = () => {
//   const getProducts = async () => {
//     const response = await axios.get("/api/products");
//     console.log(response.data);
//   };
//   getProducts();
//   return <>Sweet pus in HomeScreen</>;
// };

export default HomeScreen;
