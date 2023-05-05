import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./subComponents/ProductCard";
import { toast } from "react-toastify";
import Loader from "../Loader";
import Button from "../Button";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [tempPage, setTempPage] = useState(<Loader />);

  useEffect(() => {
    let sub = true;
    if (sub) {
      const getAllProducts = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/items");
          const { body } = res.data;
          setProducts(body.products);
        } catch (error) {
          setProducts(null);
          if (error.response.data.message.includes("401")) {
            toast.error("Please login first", { theme: "colored" });
          } else {
            toast.error(error.response.data.message, { theme: "colored" });
          }
        }
      };
      getAllProducts();
    }
    return () => {
      sub = false;
    };
  }, []);

  if (!products) {
    setTimeout(() => {
      setTempPage(
        <>
          <p>Sorry, Error with the data</p>
          <Button
            text="reload"
            onClick={() => window.location.reload()}
            type="button"
          />
        </>
      );
    }, 15000);
    return tempPage;
  }

  return (
    <section className="w-full px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        List Of all products
      </h1>
      <div className="w-full grid grid-cols-auto-fit gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
