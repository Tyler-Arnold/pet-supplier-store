import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useContainer } from "unstated-next";
import { StockContainer } from "../../containers/StockContainer";
import HeaderBar from "../utility/HeaderBar";

interface ItemPageProps extends RouteComponentProps {
  itemId?: string;
}

const ItemPage = (props: ItemPageProps) => {
  const stock = useContainer(StockContainer).stock;

  const itemId = props.itemId;
  if (!itemId) {
    return <div>no</div>;
  }

  const item = stock?.find((item) => item.itemId === Number.parseInt(itemId));

  if (!item) {
    return <div>no</div>;
  }

  return (
    <div>
      <HeaderBar />
      <div className="item-page">
        <h1 className="item-title">{item.title}</h1>
        <div className="item-image"></div>
        <div className="item-description">
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  );
};
export default ItemPage;
