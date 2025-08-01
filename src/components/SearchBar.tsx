import { useLocalizedPokemonList } from "../hooks/useLocalizedPokemonList";
import { useState } from "react";
import React from "react";

interface Props {
  onSearch: (keyword: string) => void;
}

export default function SearchBar({onSearch}: Props) {
  const [ inputValue, setInputValue ] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input type="text" placeholder="포켓몬 이름으로 검색하세요" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="search-bar" />
      <button type="submit" className="search-button">
        <img className="search-button-image" src="https://pokemonkorea.co.kr/img/search.png" />
      </button>
    </form>
  );
}
