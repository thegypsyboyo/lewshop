import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";


export default function Top({country}) {
    const [visible, setVisible] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className={styles.top}>
          <div className={styles.top__container}>
            <div></div>
            <ul className={styles.top__list}>
              <li className={styles.li}>
                <img src={country.flag} alt="" />
                <span>{country.name} / USD</span>
              </li>
              <li className={styles.li}>
                <MdSecurity />
                <span>Buyer Protection</span>
              </li>
              <li className={styles.li}>
                <span>Customer Service</span>
              </li>
              <li className={styles.li}>
                <span>Help</span>
              </li>
              <li className={styles.li}>
                <BsSuitHeart />
                <Link href="/profile/whishlist">
                  <span>Whishlist</span>
                </Link>
              </li>
              <li
                className={styles.li}
                onMouseOver={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
              >
                {loggedIn ? (
                  <li className={styles.li}>
                    <div className={styles.flex}>
                      <img src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"} alt="" />
                      <span>{"Lewis Meta"}</span>
                      <RiArrowDropDownFill />
                    </div>
                  </li>
                ) : (
                  <li className={styles.li}>
                    <div className={styles.flex}>
                      <RiAccountPinCircleLine />
                      <span>Account</span>
                      <RiArrowDropDownFill />
                    </div>
                  </li>
                )}
                {visible && <UserMenu loggedIn />}
              </li>
            </ul>
          </div>
        </div>
      );
}
