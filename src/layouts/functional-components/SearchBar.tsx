import React, { useEffect, useRef, useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";

const SearchBar = () => {
  const [isInputEditing, setInputEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("q");

    if (query) {
      setInputValue(query);
      setInputEditing(true);
    }

    if (inputRef.current && (isInputEditing || query)) {
      inputRef.current.focus();
    }
  }, [isInputEditing]);

  const updateURL = (query: string) => {
    if (typeof window === "undefined") return;

    const newURL = query
      ? `/products?q=${encodeURIComponent(query)}`
      : "/products";
    window.location.href = newURL;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() !== "") {
      setInputEditing(true);
    } else {
      setInputEditing(false);
    }

    updateURL(value);
  };

  const handleClear = () => {
    setInputValue("");
    setInputEditing(false);
    updateURL("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL(inputValue);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="border border-border dark:border-darkmode-border rounded-full flex bg-light/10 pl-4 relative"
    >
      <input
        type="text"
        name="search"
        placeholder=""
        autoComplete="off"
        value={inputValue}
        onChange={handleChange}
        ref={inputRef}
        id="searchInput"
        className="bg-transparent border-none search-input focus:ring-transparent p-2 w-full"
      />
      <div className="absolute right-0 top-0 flex h-full items-center">
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2 m-1 rounded-full"
            aria-label="Clear search"
          >
            <IoClose className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          className="search-icon p-2 m-1 rounded-full"
          aria-label="Submit search"
        >
          <IoSearch className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
