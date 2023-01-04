import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hello! I'm Robin 👋" />
        <meta property="og:url" content="https://www.robinj.xyz" />
        <meta property="og:image" content="https://avatars.githubusercontent.com/u/74519799?v=4?size=1024" />
        <meta property="og:description" content="Welcome! This is where you'll find my blog posts and a short about me section." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
