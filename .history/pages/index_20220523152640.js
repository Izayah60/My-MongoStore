import Head from 'next/head'
import { useState, useEffect } from 'react'
import * as Realm from "realm-web"

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(async () => {
    const REALM_APP_ID = process.evn.NEXT_PUBLIC_REALM_APP_ID;
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

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {products && products.map((product) => {
          return <p key={product._id}>{product.name}</p>
        })}
      </main>
    </div>
  )
}

