import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import HeaderBar from "../utility/HeaderBar";
import { StockContainer } from "../../containers/StockContainer";
import { useContainer } from "unstated-next";
import { Item, UpdateItem } from "../../getters";
import { UserContainer } from "../../containers/UserContainer";

interface FormState {
  itemTitle: string;
  itemDescription: string;
  itemPrice: number;
  itemImageUri: string | undefined;
  status: "notsubmitted" | "submitting" | "submitted" | "error";
}

interface UpdateItemPageProps extends RouteComponentProps {
  itemId?: string;
}

const UpdateItemPage = (props: UpdateItemPageProps) => {
  const stock = useContainer(StockContainer).stock;

  const itemId = props.itemId;

  const item = stock?.find((item) => item.itemId === Number.parseInt(itemId ?? "1"));

  const itemState: FormState = {
    itemTitle: item?.title ?? "Item Title",
    itemDescription: item?.description ?? "Item Description",
    itemPrice: item?.price ?? 5.99,
    itemImageUri: item?.imageUri ?? "Set an appropriate image by pasting a direct link here",
    status: "notsubmitted",
  };

  const [state, setState] = useState<FormState>(itemState);
  const user = useContainer(UserContainer);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setState({ ...state, status: "submitting" });
    const upItem: Item = {
      itemId: Number.parseInt(itemId ?? "3"),
      title: state.itemTitle,
      description: state.itemDescription,
      price: state.itemPrice,
      imageUri: state.itemImageUri,
    };
    if (user.token) {
      const result = UpdateItem(upItem, user.token);

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
          <input className={`button-${state.status}`} type="submit" value="Update Item" />
        </form>
      </div>
    </div>
  );
};
export default UpdateItemPage;
