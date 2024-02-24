import Header from "../components/header"
import Footer from "../components/footer"
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react"

import styles from "../styles/Home.module.scss";
import Main from "../components/home/main";

export default function Home({ country }) {

  const { data: session } = useSession()
  // console.log("Data:", session)
  return (
    <>
      <Header country={country} />
      {/* {session ? "you are logged in": "you are not logged in "} */}
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}


export async function getServerSideProps() {
  let data = await axios.get("https://api.ipregistry.co/?key=py4qocwvc587skyk")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err)
    })

  return {
    props: {
      // country: { 
      //   name: data?.name, 
      //   flag: data?.flag?.emojitwo 
      // },
      country: {
        name: "Kenya",
        flag: "https://cdn.ipregistry.co/flags/emojitwo/ke.svg"
      },
    },
  };
}