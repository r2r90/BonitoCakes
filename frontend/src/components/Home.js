import React, { Fragment, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import MetaData from './layouts/MetaData';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layouts/Loader';
import { useAlert } from 'react-alert';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(currentPage));
  }, [dispatch, alert, currentPage, error]);

  // * Pagination functions
  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //*
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Buy best cakes online'} />

          <section id="products" className="container mt-5">
            <h1 id="products_heading">Latest Cakes</h1>
            <div className="row">
              {products &&
                products.map((product) => <Product product={product} key={product._id} />)}
            </div>
          </section>
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
