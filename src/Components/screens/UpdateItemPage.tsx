import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import HeaderBar from "../utility/HeaderBar";
import { Item } from "../../getters";

interface FormState {
  itemTitle: string;
  itemDescription: string;
  itemPrice: number;
  itemImageUri: string | undefined;
}

interface UpdateItemPageProps extends RouteComponentProps {
  item: Item;
}

const UpdateItemPage = (props: UpdateItemPageProps) => {
  const initialState: FormState = {
    itemTitle: props.item.title,
    itemDescription: props.item.description,
    itemPrice: props.item.price ?? 5.99,
    itemImageUri: props.item.imageUri ?? "Set an appropriate image by pasting a direct link here",
  };

  const [state, setState] = useState<FormState>(initialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //TODO put some api stuff here so it actually creates the item
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target;
    const value = target.type === "checkbox" ? (target as EventTarget & HTMLInputElement).checked : target.value; // why
    const name = target.name;

    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div>
      <HeaderBar />
      <div className="new-item-page">
        <form onSubmit={handleSubmit}>
          <label>
            Item Title:
            <input name="itemTitle" type="text" value={state.itemTitle} onChange={handleInputChange} />
          </label>
          <label>
            Item Description:
            <textarea name="itemDescription" value={state.itemDescription} onChange={handleInputChange} />
          </label>
          <label>
            Item Price:
            <input
              name="itemPrice"
              type="number"
              min="0"
              max="100"
              step="1"
              value={state.itemPrice}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Item Image URI:
            <input name="itemImageUri" type="text" value={state.itemImageUri} onChange={handleInputChange} />
          </label>
          <input type="submit" value="Create New Item" />
        </form>
      </div>
    </div>
  );
};
export default UpdateItemPage;
