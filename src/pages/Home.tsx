import AbilitySelect from "../hooks/useAbilities"
import type { AbilityOption } from "../hooks/useAbilities";
import GenerationSelect from "../hooks/useGeneration"
import type { GenerationOption } from "../hooks/useGeneration"
import ShapeSelect from "../hooks/useShape"
import type { ShapeOption } from "../hooks/useShape";
import { useState } from "react";
import './pages.css';
import { useNavigate } from "react-router";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import { useLocalizedPokemonList } from "../hooks/useLocalizedPokemonList";

export default function home() {
  const navigate = useNavigate();
  const [ selectedAbility, setSelectedAbility ] = useState<AbilityOption | null>(null);
  const [ selectedGeneration, setSelectedGeneration ] = useState<GenerationOption | null>(null);
  const [ selectedShape, setSelectedShape ] = useState<ShapeOption | null>(null);
  const handleClick = () => {
    navigate('/detail');
  }
  const [ keyword, setKeyword ] = useState("");

  const { data: allPokemon, isLoading, isError } = useLocalizedPokemonList();
  const filteredPokemon = allPokemon?.filter((pokemon) => pokemon.name_ko.includes(keyword)) ?? [];
  return (
    <div className="main-container">
      <header>
        <img className="header-image" src="https://pokemonkorea.co.kr/img/icon/icon_ball_b.png" />
        <span className="header-text">포켓몬 도감</span>
        <button className="header-button" onClick={handleClick}>포켓몬 포획하기</button>
      </header>
      <div className="content-container">
        <SearchBar onSearch={setKeyword} />
        <div className="filter-box">
          <span className="abilities-text">특성</span>
          <AbilitySelect 
            onChange={setSelectedAbility}
          />
          <span className="generation-text">세대</span>
          <GenerationSelect
            onChange={setSelectedGeneration}
          />
          <span className="shape-text">외형</span>
          <ShapeSelect
            onChange={setSelectedShape}
          />
        </div>
        <div className="type-box">
          <span className="type-text">타입</span>
        </div>
      </div>
      <div className="card-box">
        {keyword.length > 0 && filteredPokemon?.length > 0 ? (
          filteredPokemon.filter((pokemon) => !!pokemon.name_en)
          .map((pokemon) => (
            <PokemonCard key={`${pokemon.name_en}-${pokemon.id}`} pokemon={pokemon} />
          ))
        ) : (
          <Card />
        )}

        {keyword && filteredPokemon.length === 0 && (
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        )}        
      </div>
    </div>
  )
}
