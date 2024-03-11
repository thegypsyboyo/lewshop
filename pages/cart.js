import { useSelector } from 'react-redux';
import Empty from '../components/cart/empty';
import Header from '../components/cart/header'

import styles from "../styles/cart.module.scss"
import Product from '../store/product';
import CartHeader from '../store/cartHeader';
import Checkout from '../store/checkout';

export default function Cart() {

  const { cart } = useSelector((state) => ({ ...state }));

  // const slice = [];
  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
            />
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product
                  product={product}
                  key={product._uid}
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