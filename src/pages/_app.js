import "bootstrap/dist/css/bootstrap.css";
import '@/globals.css'
import { useEffect } from "react";

import useStore from "@store";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {

  const check = useStore((state) => state.check);
  const r = useRouter();

  useEffect(() => {
    document.title = "App web: Museo della Regina di Cattolica";

    if(check() && r.pathname!='/'){
      //r.push('./');
    }

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