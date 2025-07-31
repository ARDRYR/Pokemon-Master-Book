import React, { useState, useEffect } from "react";
import usePokemonList from "../hooks/usePokemonList"
import type { PokemonList } from "../hooks/usePokemonList";
import axios from "axios";
import "../components/componentsCss.css"

interface PokemonDetail{
  name: string;
  types: string[];
  sprite: string;
}

export default function Card() {
  const { data, isLoading, isError } = usePokemonList();
  const [ detailList, setDetailList ] = useState<PokemonDetail[]>([]);
  const [ loadingDetail, setLoadingDetail ] =  useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if(!data?.results) return;

      try {
        const promise = data.results.slice(0, 20).map(async (pokemon: PokemonList) => {
          const res = await axios.get(pokemon.url);
          const types = res.data.types.map((t: any) => t.type.name);
          const sprite = res.data.sprites.front_default;

          return {
            name: pokemon.name,
            types,
            sprite,
          };
        });

        const results = await Promise.all(promise);
        setDetailList(results);
      } catch(err) {
        console.log("포켓몬 상세 정보 가져오기 실패", err);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchDetails();
  }, [data]);

  if(isLoading) return <p>로딩 중...</p>
  if(isError) return <p>에러 발생!</p>

  
  return(
    <div className="card-container">
    {detailList.map((pokemon) => (
      <div key={pokemon.name} className="pokemon-card">
        <img src={pokemon.sprite} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <p>{pokemon.types.join(" / ")}</p>
      </div>
    ))}
  </div>
  )
}
