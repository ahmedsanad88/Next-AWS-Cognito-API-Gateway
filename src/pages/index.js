import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/products/Products";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { getCookie } from "cookies-next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        className={`w-full min-h-[calc(100dvh-10rem)] flex items-center justify-center ${inter.className}`}
      >
        <Products />
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  // Verifier that expects valid access tokens:
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    tokenUse: "access",
    clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  });

  try {
    const payload = await verifier.verify(
      getCookie("accessToken", { req, res })
    );
  } catch {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
