import { useState } from "react";

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

function App() {
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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [items, setItems] = useState([]); moved to App

  // function handleAddItems(item) {
  //   // setItems((items) => items.push(item)); DON'T MUTATE ARRAY
  //   setItems((items) => [...items, item]);
  // }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("e: ", e);

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    // console.log("newItem: ", newItem);

    // handleAddItems(newItem);
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>What do you need for your 😻 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          // console.log("e.target.value: ", e.target.value);
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          // console.log("e.target.value: ", e.target.value);
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {/* {initialItems.map((item) => ( */}

        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}
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

export default App;
