import "./index.css";
import { useState } from "react";
import Logo from "./Logo"
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
  { id: 4, description: "FlashLights", quantity: 3, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]);
  // const numItems = items.lenght;

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );

 

 
  function Item({ item, onDeleteItem, onToggleItem }) {
    return (
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggleItem(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </li>
    );
  }

  function Stats({ items }) {
    if (!items.length)
      return (
        <p className="stats">
          <em>Start adding some items to your packing list 🚀</em>
        </p>
      );
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100);

    return (
      <footer className="stats">
        <em>
          {percentage === 100
            ? "You got everything! Ready to go ✈ "
            : ` 🛴You have ${numItems} items on your list, and you already
          packed ${numPacked} (${percentage}%)`}
        </em>
      </footer>
    );
  }
}