import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="max-w-[1800px] mx-auto">
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  );
}
