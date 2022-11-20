import { Head } from "$fresh/runtime.ts";

import Page from "../components/Page.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>snen.dev</title>
      </Head>
      <Page>
        <section>
          <h3 className="text-3xl text-bold mb-6">
            Welcome to snen.dev, Inc.
          </h3>
          <p className="my-3">
            We are an NYC-based team of professional software developers
            providing consulting and development services. We specialize in
            front-end projects using a variety of technologies, including but
            not limited to React, React Native, NextJS, MUI, Expo, TypeScript,
            Deno, and TailwindCSS.
          </p>
          <p className="my-3">
            For backend or full-stack projects, our proficiencies also include
            Rust, Golang, Python, and Godot. We have experience with a variety
            of cloud platforms and application development platforms.
          </p>
          <p className="my-3">
            We work on web applications, mobile applications, backend software,
            and more. Eventually, we hope to showcase internal projects on this
            website!
          </p>
          <p className="my-3">
            If you are interested in contracting or consulting with us, feel
            free to send us an{" "}
            <a
              href="mailto:me@snen.dev"
              className="text-blue-600 visited:text-purple-600 hover:text-emerald-600"
            >
              email
            </a>
            .
          </p>
          <p className="my-3">
            This page was built using{" "}
            <a
              href="https://fresh.deno.dev/"
              className="text-blue-600 visited:text-purple-600 hover:text-emerald-600"
            >
              fresh.js
            </a>
            , a next-gen web framework.
          </p>
        </section>
      </Page>
    </>
  );
}
