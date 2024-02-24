import SwiperMain from "./Swiper"
import styles from "./styles.module.scss"

export default function Main() {
  return (
    <div className={styles.main}>
        <div className={styles.header}>header</div>
        <div className={styles.menu}>menu</div>
        <SwiperMain />
        <div className={styles.offers}>offers</div>
        <div className={styles.user}>user</div>
    </div>
  )
}
