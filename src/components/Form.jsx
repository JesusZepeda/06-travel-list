import { useState } from "react";

export default function Form({ onAddItems }) {
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
