import { useContainer } from "unstated-next";
import config from "./config";
import { UserContainer } from "./containers/UserContainer";

export interface Item {
  id: number;
  title: string;
  description: string;
}

export const GetStock = async (userToken?: string): Promise<Item[]> => {
  const token = userToken;

  return fetch(config.apiUrl, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
  })
    .then((res) => {
      if (res.status === 401) {
        // unauthorised, go get new token
      }
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((res) => {
      return res.stock as Item[];
    });
};
