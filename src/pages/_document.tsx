import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="manifest" href="/static/manifest.json" />

      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="apple-touch-icon" href="/static/logo192.png" />
      <link rel="apple-touch-icon" href="/static/logo512.png" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
