import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);

  // Fetch from backend
  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/items');
      setItems(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const addItem = async (item) => {
    try {
      const res = await axios.post('http://localhost:8000/api/items', item);
      setItems(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider value={{ items, addItem }}>
      {children}
    </ItemsContext.Provider>
  );
}
