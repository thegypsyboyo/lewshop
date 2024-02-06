import Header from "../components/header"
import Footer from "../components/footer"
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home({ country}) {

  const { data: session } = useSession() 
  console.log("Data:", session)
  return (
    <div className="">
      <Header country={country} />
      {session ? "you are logged in": "you are not logged in "}
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