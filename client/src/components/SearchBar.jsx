import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions";
import styles from './SearchBar.module.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  //console.log(name);

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getByName(name));
    setName('')
  };
  return (
    <form className={styles.searchContainer} onSubmit={(event) => handleClick(event)}>
      <div className={styles.searchBox}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search country..."
        onChange={(e) => handleInputChange(e)}
      />
      <button className={styles.searchButton} type="submit">Search</button>
      </div>
    </form>
  );
}

