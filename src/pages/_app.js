import "bootstrap/dist/css/bootstrap.css";
import '@/globals.css'
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    document.title = "App web: Museo della Regina di Cattolica";

    const handleContextmenu = e => {
        e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
        document.removeEventListener('contextmenu', handleContextmenu)
    }
}, [ ]);

  return <Component {...pageProps} />
}