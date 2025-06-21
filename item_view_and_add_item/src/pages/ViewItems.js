import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemDetailsModal from '../components/ItemDetailsModal'; // Import the modal component

function ViewItems() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // State to track the selected item

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/items`)
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {items.map(item => (
          <ItemCard key={item._id} item={item} onClick={() => setSelectedItem(item)} />
        ))}
      </div>

      {/* Show the modal if an item is selected */}
      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)} // Close the modal
        />
      )}
    </div>
  );
}

function ItemCard({ item, onClick }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center p-4 cursor-pointer"
      style={{ width: '240px', height: '320px' }}
      onClick={onClick} // Trigger the modal on click
    >
      <div
        className="relative mb-4 bg-gray-200 rounded-md overflow-hidden"
        style={{ width: '200px', height: '150px' }}
      >
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <img
              src="/backup.png"
              alt="Loading..."
              className="w-10 h-10 animate-pulse"
            />
          </div>
        )}

        {!error ? (
          <img
            src={item.coverImage}
            alt={item.name}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-red-500 text-sm">
            Failed to load
          </div>
        )}
      </div>

      <h3 className="text-center text-sm font-medium text-gray-800">{item.name}</h3>
    </div>
  );
}

export default ViewItems;