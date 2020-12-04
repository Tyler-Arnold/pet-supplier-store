import { useState } from "react";
import { createContainer, useContainer } from "unstated-next";
import { Item } from "../getters";
import { UserContainer } from "./UserContainer";

function useBasket() {
  let [basket, setBasket] = useState<Item[] | null>();
  const token = useContainer(UserContainer).token;

  const addToBasket = (item: Item) => {
    if (basket) {
      setBasket([...basket, item]);
    }
    setBasket([item]);
  };

  return { basket, addToBasket };
}

export const BasketContainer = createContainer(useBasket);
