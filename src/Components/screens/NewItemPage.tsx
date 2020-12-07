import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import HeaderBar from "../utility/HeaderBar";
import { Item, SetNewStock } from "../../getters";
import { useContainer } from "unstated-next";
import { UserContainer } from "../../containers/UserContainer";

interface FormState {
  itemTitle: string;
  itemDescription: string;
  itemPrice: number;
  itemImageUri: string | undefined;
  status: "notsubmitted" | "submitting" | "submitted" | "error";
}

const NewItemPage = (props: RouteComponentProps) => {
  const initialState: FormState = {
    itemTitle: "Set a title for the new item",
    itemDescription: "Write an informative description for the new item",
    itemPrice: 5.99,
    itemImageUri: "Set an appropriate image by pasting a direct link here",
    status: "notsubmitted",
  };

  const [state, setState] = useState<FormState>(initialState);

  const user = useContainer(UserContainer);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const newItem: Item = {
      itemId: 1,
      title: state.itemTitle,
      description: state.itemDescription,
      imageUri: state.itemImageUri,
      price: state.itemPrice,
    };
    if (user.token) {
      const result = SetNewStock(newItem, user.token);

      result.then((res) => {
        if (res) {
          setState({ ...state, status: "submitted" });
        } else {
          setState({ ...state, status: "error" });
        }
      });
    }
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
              step="0.01"
              value={state.itemPrice}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Item Image URI:
            <input name="itemImageUri" type="text" value={state.itemImageUri} onChange={handleInputChange} />
          </label>
          <input className={`button-${state.status}`} type="submit" value="Create New Item" />
        </form>
      </div>
    </div>
  );
};
export default NewItemPage;
