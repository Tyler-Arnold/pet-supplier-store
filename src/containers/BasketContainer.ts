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
    } else {
      setBasket([item]);
    }
  };

  const removeFromBasket = (item: Item) => {
    const newBasket = basket?.filter((bItem) => bItem !== item); // filter all items in basket that are the item to be removed
    if (newBasket) {
      setBasket(newBasket);
    }
  };

  return { basket, addToBasket, removeFromBasket };
}

export const BasketContainer = createContainer(useBasket);
