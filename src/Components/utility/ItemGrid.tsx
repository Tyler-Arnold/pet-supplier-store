import React from "react";
import { Item } from "../../getters";

interface ItemGridProps {
  items: Item[];
  rows?: number;
  columns?: number;
}

const ItemBox = (props: { item: Item }) => {
  const prepItemString = (description: string) => {
    if (description.length > 140) {
      return description.trim().substring(0, 140).trim();
    }
    return description.trim();
  };

  const itemTitle = prepItemString(props.item.title);
  return (
    <div className="item-box">
      <div className="item-image">
        <img alt={itemTitle}></img>
      </div>
      <h3 className="item-title">{itemTitle}</h3>
      <p className="item-desc">{prepItemString(props.item.description)}</p>
    </div>
  );
};

const ItemGrid = (props: ItemGridProps) => {
  return (
    <div className="item-grid">
      <ItemBox item={props.items[0]} />
      <ItemBox item={props.items[1]} />
    </div>
  );
};

export default ItemGrid;
