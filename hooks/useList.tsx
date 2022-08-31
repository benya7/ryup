import { useState } from "react";

export default function useList<T = string>() {
  const [list, setList] = useState<T[]>([]);

  const addItem = (item: T) => {
    setList((prev) => {
      return [...prev, item];
    });
  };

  const removeItem = (item: T) => {
    const guardiansFiltered = list.filter((i) => i !== item);
    setList(guardiansFiltered);
  };

  const clear = () => setList([]);

  return { list, addItem, removeItem, clear };
}
