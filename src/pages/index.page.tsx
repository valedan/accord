import Head from "next/head";

import WorkflowEditor from "../features/Workflows/WorkflowEditor";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="m-8">
      <Head>
        <title>Accord</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WorkflowEditor />
    </div>
  );
};

export default Home;
