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
  }, 30000);

  async function RetrieveStock() {
    if (token) {
      setStock(await GetStock(token));
    }
  }

  return { stock, RetrieveStock };
}

export const StockContainer = createContainer(useStock);
