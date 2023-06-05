import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html lang="it">
      <Head>
        <title>App web: Museo della Regina di Cattolica</title>
      </Head>      
      <body oncontextmenu="return false">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
