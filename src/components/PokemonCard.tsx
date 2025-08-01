import React, { useState, useEffect } from "react";
import usePokemonList from "../hooks/usePokemonList"
import type { PokemonList } from "../hooks/usePokemonList";
import axios from "axios";
import "../components/componentsCss.css"
import { useNavigate } from "react-router";

interface PokemonDetail{
  name: string;
  koreanName: string;
  id: number;
  types: string[];
  sprite: string;
}

export default function Card() {
  const { data, isLoading, isError } = usePokemonList();
  const [ detailList, setDetailList ] = useState<PokemonDetail[]>([]);
  const [ loadingDetail, setLoadingDetail ] =  useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      if(!data?.results) return;

      try {
        const promise = data.results.slice(0,500).map(async (pokemon: PokemonList) => {
          const res = await axios.get(pokemon.url);
          const id = res.data.id;
          const types = res.data.types.map((t: any) => t.type.name);
          const sprite = res.data.sprites.front_default;
          

          const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
          const koreanEntry = speciesRes.data.names.find(
            (entry: any) => entry.language.name === "ko"
          );
          const koreanName = koreanEntry?.name ?? pokemon.name;

          return {
            name: pokemon.name,
            koreanName,
            id,
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
      <button key={pokemon.name} className="pokemon-card" onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
        <img src={pokemon.sprite} alt={pokemon.name} />
        <span>No.{pokemon.id}</span>
        <h3>{pokemon.koreanName}</h3>
        <p>{pokemon.types.join(" / ")}</p>
      </button>
    ))}
  </div>
  )
}
