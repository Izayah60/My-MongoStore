import Head from 'next/head'
import { useState, useEffect } from 'react'
import * as Realm from "realm-web"
import Container from '../components/Container'
import Header from '../components/Header'
import Hero from '../components/Hero'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(async () => {
    const REALM_APP_ID = "products-egpnt";
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();

    try {
      const user = await app.logIn(credentials);
      const allProducts = await user.functions.getAllProducts();
      setProducts(allProducts)
    } catch (error) {
      console.error(error);
    }
  }, [])
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-white w-full min-h-screen'>
        <Header />
        <Container>
          <Hero />
        </Container>
      </div>
    </div>
  )
}

