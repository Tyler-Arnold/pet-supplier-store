import { useState } from "react";
import { createContainer, useContainer } from "unstated-next";
import { GetStock, Item } from "../getters";
import { UserContainer } from "./UserContainer";
import { useInterval } from "../hooks/useInterval";

function useStock() {
  let [stock, setStock] = useState<Item[] | null>();
  const token = useContainer(UserContainer).token;

  /**
   * Updates the beach data in state every 5 minutes, there's a hook in Application.tsx for doing it on login
   */
  useInterval(() => {
    RetrieveStock();
  }, 300000);

  async function RetrieveStock() {
    if (token) {
      const stock = await GetStock(token);

      if (typeof stock === "number") {
        console.log(stock);
        return;
      }
      setStock(stock);
    }
  }

  return { stock, RetrieveStock };
}

export const StockContainer = createContainer(useStock);
