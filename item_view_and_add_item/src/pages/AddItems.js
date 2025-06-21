import React, { useContext } from 'react';
import AddItemForm from '../components/AddItemForm';
import { ItemsContext } from '../context/ItemsContext';

function AddItems() {
  const { addItem } = useContext(ItemsContext);
  return <AddItemForm onAdd={addItem} />;
}

export default AddItems;