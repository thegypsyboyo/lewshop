import Empty from '../components/cart/empty';
import Header from '../components/cart/header'

import styles from "../styles/cart.module.scss"

export default function Cart() {
  const cart = [];

  return (
    <>
      <Header />
      <div className={styles.cart}>
        { cart.length > 1 ? (
          <div className={styles.cart__container}>
            Cart Object
          </div>
        ): (
          <div className={styles.empty}>
            <Empty/>
          </div>
        )}
      </div>
    </>

  )
}