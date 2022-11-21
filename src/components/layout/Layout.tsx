import Head from "next/head";
import { FC, PropsWithChildren } from "react";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Randi | Frontend CRUD with Typescript</title>
        <meta
          name="description"
          content="Frontend CRUD with Typescript by Randi Faturrakhman"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-6 lg:px-0">{children}</main>
    </>
  );
};
