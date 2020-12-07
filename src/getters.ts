import config from "./config";

export interface Item {
  itemId: number;
  title: string;
  description: string;
  price?: number;
  imageUri?: string;
}

export const GetStock = async (userToken?: string): Promise<Item[] | number> => {
  const token = userToken;

  const stock = fetch(config.apiUrl, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()).stock as Item[];
    } else {
      return res.status;
    }
  });

  return stock;
};

export const SetNewStock = async (item: Item, userToken?: string): Promise<boolean> => {
  const token = userToken;

  const response = fetch(config.apiUrl, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify(item),
  }).then(async (res) => {
    if (res.ok) {
      return true;
    } else {
      return false;
    }
  });

  return response;
};

export const UpdateItem = async (item: Item, userToken?: string): Promise<boolean> => {
  const token = userToken;

  const response = fetch(`${config.apiUrl}/${item.itemId}`, {
    method: "put",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify(item),
  }).then(async (res) => {
    if (res.ok) {
      return true;
    } else {
      return false;
    }
  });

  return response;
};
