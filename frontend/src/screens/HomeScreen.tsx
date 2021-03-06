import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import axios from 'axios'

const HomeScreen = ({ match }) => {
  // const [search, setSearch] = useState("");
  // const [previewSearches, setPreviewSearches] = useState([]);
  // const [requestCount, setRequestCount] = useState(0);
  // const onLoadSearches = async value => {
  //   try {
  //     setRequestCount(requestCount + 1);
  //     const res = await axios.get(
  //       `/api/products?keyword=${value}`
  //     )
  
  //     console.log(value)
  //     console.log(res)
  //     const cities = res.data.products;
  //     console.log(cities)
  //     setPreviewSearches(cities);
  //   } catch {
  //     setPreviewSearches([]);
  //   }
  // };
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword && pageNumber<=1 ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
        <i className="fas fa-long-arrow-alt-left fa-5x"></i>
        </Link>
      )}
      {/* <input
        type="text"
        placeholder="Search any Country ..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          onLoadSearches(e.target.value);
        }}
      />
      {previewSearches.length > 0 && (
        <ul>
          {previewSearches.map((city, i) => {
            return <li key={i}>{city.name}</li>;
          })}
        </ul>
      )} */}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
