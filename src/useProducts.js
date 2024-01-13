import { useState, useEffect } from "react";

export function useProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(function () {
    async function getProducts() {
      try {
        setIsLoading(false);
        setError("");
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) throw new Error("Couldn't get products");

        const data = await res.json();
        // const productsData = data.map((item) => ({
        //   ...item,

        // }));

        setProducts(data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getProducts();
  }, []);

  return { products, isLoading, error };
}
