import { useState, useEffect } from "react";

export function useInternationalization(amount) {
  const [priceInNaira, setPriceInNaira] = useState("");

  useEffect(
    function () {
      const price = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      })
        .format(amount)
        .split(".")
        .at(0);

      setPriceInNaira(price);
    },
    [amount]
  );

  return priceInNaira;
}
