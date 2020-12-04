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
      <div className="basket-page">{basket.basket ? <ItemList items={basket.basket} /> : <></>}</div>
    </div>
  );
};

const ItemList = (props: { items: Item[] }) => {
  return (
    <>
      {props.items.map((item) => (
        <ItemRow item={item} />
      ))}
    </>
  );
};

const ItemRow = (props: { item: Item }) => {
  return (
    <div>
      <h3>{props.item.title}</h3>
      <p>{props.item.description}</p>
      <p>£3.99</p>
    </div>
  );
};
export default BasketPage;
