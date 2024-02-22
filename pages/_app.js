
import { SessionProvider } from "next-auth/react"
import styles from "../styles/globals.scss"
import { Provider } from "react-redux";
import store from "../store"
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
import Header from "../components/header"

let persistor = persistStore(store);


export default function App({ 
  Component, 
  pageProps:  { session, ...pageProps },

}) {
  return (
    <>
      <Head>
        <title>Shoppay - Home</title>
        <meta name="description" content="Online shopping service for all your needs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* <Header country={"Kenya"} /> */}
            <Component  {...pageProps} />
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}
