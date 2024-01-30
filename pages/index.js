import Header from "../components/header"
import Footer from "../components/footer"
import axios from "axios";


export default function Home({ country}) {
  console.log("Country:", country)
  return (
    <div className="">
      <Header country={country} />
      <Footer country={country} />
    </div>
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
      country: { 
        name: data.name, 
        flag: data.flag.emojitwo },
    },
   };
}