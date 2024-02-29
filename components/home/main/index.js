import Header from "./Header"
import Menu from "./Menu"
import SwiperMain from "./Swiper"
import User from "./User"
import Offers from "./offers"
import styles from "./styles.module.scss"

export default function Main() {
  return (
    <div className={styles.main}>
        <Header />
        <Menu />
        <SwiperMain />
        <Offers />
        <User />
    </div>
  )
}
