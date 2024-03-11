import React from 'react'
import styles from "./styles.module.scss"

export default function CartHeader({ cartItems }) {

  // const [active, setActive] = useState();

  return (
    <div className={`${styles.cart__header} ${styles.card}`}>
      <h1>Item Summary({cartItems.length})</h1>
      <div className={styles.flex} onClick={() => {}}>
        <div
          className={`${styles.checkbox}`}
        ></div>
        <span>Select all items</span>
      </div>
    </div>
  )
}
