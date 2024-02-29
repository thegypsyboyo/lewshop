import Header from "../components/header"
import Footer from "../components/footer"
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react"

import styles from "../styles/Home.module.scss";
import Main from "../components/home/main";
import FlashDeals from "../components/home/flashdeal";
import Category from "../components/home/category";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "../data/home";
import { useMediaQuery } from "react-responsive";
import ProductsSwiper from "../components/productsSwiper";
import db from "../utils/db"
import Product from "../models/Product"
import ProductCard from "../components/productCard";


export default function Home({ country, products }) {

  // console.log("Products from Client:", products)
  const { data: session } = useSession()
  // console.log("Data:", session)
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <>
      <Header country={country} />
      {/* {session ? "you are logged in": "you are not logged in "} */}
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header={"Dresses"}
              background="#5a31f4"
              products={women_dresses}
            />
            {!isMedium && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            {isMobile && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
          </div>
          <ProductsSwiper products={women_swiper} bg={"#c4c"} header={"Women Wares"}/>

          <div className={styles.products}>
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}


export async function getServerSideProps() {
  db.connectDb();
  
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  // console.log("Products:", products)

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
      products: JSON.parse(JSON.stringify(products)),
      country: {
        name: "Kenya",
        flag: "https://cdn.ipregistry.co/flags/emojitwo/ke.svg"
      },
    },
  };
}