import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import "./index.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
  //   { id: 4, description: "FlashLights", quantity: 3, packed: false },
  //   { id: 5, description: "Pliers", quantity: 2, packed: true },
  //   { id: 6, description: "Batteries", quantity: 10, packed: true },
  //   { id: 7, description: "Soaps", quantity: 12, packed: false },
  //   { id: 8, description: "Screwdriver", quantity: 1, packed: true },
  //   { id: 9, description: "Lighters", quantity: 2, packed: false },
  //   { id: 10, description: "Firewood", quantity: 1, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  // const numItems = items.length;

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    // console.log("id: ", id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  // function handleClearList() {
  //   setItems([]);
  // }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?",
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
}
