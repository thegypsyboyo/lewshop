import { useSelector } from 'react-redux';
import Empty from '../components/cart/empty';
import Header from '../components/cart/header'

import styles from "../styles/cart.module.scss"
import Product from '../store/product';
import CartHeader from '../store/cartHeader';
import Checkout from '../store/checkout';
import { useEffect, useState } from 'react';

export default function Cart() {

  const { cart } = useSelector((state) => ({ ...state }));

  const [selected, setSelected] = useState([]);

  const [shippingFee, setShippingFee] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setShippingFee(selected.reduce((a, c) => a + c.shipping, 0).toFixed(2));
    setSubTotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
    setTotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));

  }, [selected])



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
            <Checkout
              subtotal={subTotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
            />

          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>

  )
}