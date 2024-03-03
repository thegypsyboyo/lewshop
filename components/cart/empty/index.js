import Link from "next/link";
import styles from "./styles.module.scss"
import { useSession, signIn } from "next-auth/react"

export default function Empty() {
    const { data: session } = useSession();
    return (
        <div className={styles.empty}>
            <img src="/images/empty.png" />
            <h1>Cart is empty</h1>

            {!session ? (
                <button
                    onClick={() => signIn()}
                    className={styles.empty_btn}
                >
                    SIGN IN / REGISTER
                </button>
            ) : (
                <Link href="/browser">
                    <a>
                        <button className={`${styles.empty_btn} ${styles.empty__btn_v2}`}>
                            SHOP NOW
                        </button>
                    </a>
                </Link>
            )}
        </div>
    )
}
