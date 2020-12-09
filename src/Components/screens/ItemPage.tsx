import React from "react";
import { Link, RouteComponentProps } from "@reach/router";
import { useContainer } from "unstated-next";
import { StockContainer } from "../../containers/StockContainer";
import HeaderBar from "../utility/HeaderBar";
import { BasketContainer } from "../../containers/BasketContainer";

interface ItemPageProps extends RouteComponentProps {
  itemId?: string;
}

const ItemPage = (props: ItemPageProps) => {
  const stock = useContainer(StockContainer).stock;
  const basket = useContainer(BasketContainer);

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
        <div className="item-image">
          <img src={item.imageUri} alt={item.title} />
        </div>
        <div className="item-description">
          <p>{item.description}</p>
        </div>
        <button onClick={() => basket.addToBasket(item)}>Add to Basket</button>
        <Link className="button" to={`/item/update/${item.itemId}`}>
          Update this Item
        </Link>
      </div>
    </div>
  );
};
export default ItemPage;
