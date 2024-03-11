import { useSelector } from 'react-redux';
import Empty from '../components/cart/empty';
import Header from '../components/cart/header'

import styles from "../styles/cart.module.scss"
import Product from '../store/product';
import CartHeader from '../store/cartHeader';
import Checkout from '../store/checkout';
import { useEffect, useState } from 'react';

export default function Cart() {

  const [selected, setSelected] = useState([]);

  const { cart } = useSelector((state) => ({ ...state }));

  // const slice = [];
  console.log("selected", selected)
  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product
                  product={product}
                  key={product._uid}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout subtotal="5000" />
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>

  )
}