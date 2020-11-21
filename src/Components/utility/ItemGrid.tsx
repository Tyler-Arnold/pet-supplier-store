import React from "react";
import { Item } from "../../getters";

interface ItemGridProps {
  items: Item[];
  rows?: number;
  columns?: number;
}

const ItemGrid = (props: ItemGridProps) => {
  const rows = props.rows;
  const columns = props.columns;
  let items = props.items;

  while (items.length < 20) {
    items.push(...props.items);
  }

  return (
    <div className="item-grid">
      {items.map((item) => (
        <ItemBox item={item} />
      ))}
    </div>
  );
};

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

export default ItemGrid;
