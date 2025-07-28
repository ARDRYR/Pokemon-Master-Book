import usePokemonList from "../hooks/usePokemonList";
import AbilitySelect from "../hooks/useAbilities"
import type { AbilityOption } from "../hooks/useAbilities";
import GenerationSelect from "../hooks/useGeneration"
import type { GenerationOption } from "../hooks/useGeneration"
import ShapeSelect from "../hooks/useShape"
import type { ShapeOption } from "../hooks/useShape";
import { useState } from "react";

export default function home() {
  const { data, isLoading } = usePokemonList();
  const [ selectedAbility, setSelectedAbility ] = useState<AbilityOption | null>(null);
  const [ selectedGeneration, setSelectedGeneration ] = useState<GenerationOption | null>(null);
  const [ selectedShape, setSelectedShape ] = useState<ShapeOption | null>(null);

  return (
    <div className="main-container">
      <header>
        <img className="header-image" src="https://pokemonkorea.co.kr/img/icon/icon_ball_b.png" />
        <span className="header-text">포켓몬 도감</span>
        <button className="header-button">포켓몬 포획하기</button>
      </header>
      <div className="content-container">
        <input className="search-bar" type="text" placeholder="이름 또는 도감번호로 검색하세요" />
        <button className="search-button">
          <img className="search-button-image" src="https://pokemonkorea.co.kr/img/search.png" />
        </button>
        <div className="filter-box">
          <span className="abilities-text">특성</span>
          <AbilitySelect 
            value={selectedAbility}
            onChange={setSelectedAbility}
          />
          <span className="generation-text">세대</span>
          <GenerationSelect
            value={selectedGeneration}
            onChange={setSelectedGeneration}
          />
          <span className="shape-text">외형</span>
          <ShapeSelect
            value={selectedShape}
            onChange={setSelectedShape}
          />
        </div>
        <div className="type-box">
          <span className="type-text">타입</span>
          
        </div>
      </div>
    </div>
  )
}