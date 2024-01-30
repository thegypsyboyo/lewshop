import Link from "next/link";
import styles from "./styles.module.scss";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";



export default function Main() {
 
  const { cart } = useSelector((state) => ({ ...state }));
  
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/">
          <a className={styles.logo}>
            <img src="../../../logo.png" alt="" />
          </a>
        </Link>
        <form  className={styles.search}>
          <input
            type="text"
            placeholder="Search..."
          />
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line />
          </button>
        </form>
        <Link href="/cart">
          <a className={styles.cart}>
            <FaOpencart />
            <span>0</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
