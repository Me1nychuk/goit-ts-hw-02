import toast, { Toaster } from "react-hot-toast";
import { FC , FormEvent} from "react";

import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (word: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    const newWordElement = e.currentTarget.querySelector<HTMLInputElement>('input[name="searchWord"]');
    const newWord: string = newWordElement ? newWordElement.value.trim() : '';

    if (newWord !== "") {
      onSubmit(newWord);
      e.currentTarget.reset();
      toast.success("You have entered the correct data", {
        position: "top-right",
      });
    } else {
      toast.error("Oops, you have to enter some text.", {
        position: "top-right",
      });
    }
  };
  return (
    <header className={css.SearchBar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search images and photos"
          name="searchWord"
          className={css.input}
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
        <Toaster />
      </form>
    </header>
  );
};



export default SearchBar;
