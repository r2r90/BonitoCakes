import React, { Fragment, useEffect } from 'react';
import MetaData from './layouts/MetaData';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layouts/Loader';
import { useAlert } from 'react-alert';

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, products, error, productsCount } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, alert, error]);

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
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
