import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useContainer } from "unstated-next";
import HeaderBar from "../utility/HeaderBar";
import { BasketContainer } from "../../containers/BasketContainer";
import { Item } from "../../getters";

const BasketPage = (props: RouteComponentProps) => {
  const basket = useContainer(BasketContainer);

  return (
    <div>
      <HeaderBar />
      <div className="basket-page">
        <div className="basket-list">
          <h1>Your Basket</h1>
          {basket.basket ? <ItemList items={basket.basket} /> : <h2>Your Basket is Empty</h2>}
        </div>
      </div>
    </div>
  );
};

const ItemList = (props: { items: Item[] }) => {
  const basket = useContainer(BasketContainer);

  return (
    <>
      {props.items.map((item) => (
        <ItemRow item={item} onClick={() => basket.removeFromBasket(item)} />
      ))}
    </>
  );
};

const ItemRow = (props: { item: Item; onClick: () => void }) => {
  return (
    <div>
      <h3>{props.item.title}</h3>
      <p>{props.item.description}</p>
      <p>£3.99</p>
      <button onClick={props.onClick}>Remove from Basket</button>
    </div>
  );
};
export default BasketPage;
