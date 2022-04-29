import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Accord</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p> Hello world</p>
    </div>
  );
};

export default Home;
