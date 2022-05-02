import Head from "next/head";

import Workflows from "../features/Workflows/Workflows";
import workflows from "../presetWorkflows";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="m-8">
      <Head>
        <title>Accord</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Workflows workflows={workflows} />
    </div>
  );
};

export default Home;
