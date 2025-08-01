import React, { useState, useEffect, useRef } from "react";
import usePokemonList from "../hooks/usePokemonList"
import type { PokemonList } from "../hooks/usePokemonList";
import axios from "axios";
import "../components/componentsCss.css"
import { useNavigate } from "react-router";
import { usePokemonDetail } from "../hooks/usePokemonDetail";

interface PokemonDetail{
  name: string;
  koreanName: string;
  id: number;
  types: string[];
  sprite: string;
}

export default function Card() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, } = usePokemonList();
  const [ detailList, setDetailList ] = useState<PokemonDetail[]>([]);
  const [ loadingDetail, setLoadingDetail ] =  useState(true);
  const navigate = useNavigate();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const fetchDetails = async () => {
      if(!data?.pages) return;
      const allPokemon: PokemonList[] = data.pages.flatMap((page) => page.results);
      const alreadyLoaded = new Set(detailList.map((d) => d.name + "-" + d.id));
      const newPokemon = allPokemon.filter((p) => !alreadyLoaded.has(p.name));

      setLoadingDetail(true);

      try {
        const detailPromise = newPokemon.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          if (!res.data.is_default) return null;
          const id = res.data.id;
          const types = res.data.types.map((t: any) => t.type.name);
          const sprite = res.data.sprites.front_default;
          

          const speciesRes = await axios.get(res.data.species.url);
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

        const results = (await Promise.all(detailPromise)).filter(Boolean) as PokemonDetail[];
        setDetailList((prev) => {
          const existingNames = new Set(prev.map((p) => p.name));
          const filteredResults = results.filter((r) => !existingNames.has(r.name));
          return [...prev, ...filteredResults];
        });
      } catch(err) {
        console.log("포켓몬 상세 정보 가져오기 실패", err);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchDetails();
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1, rootMargin: '200px', }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if(isLoading) return <p>로딩 중...</p>
  if(isError) return <p>에러 발생!</p>

  
  return(
    <div className="card-container">
    {detailList.map((pokemon) => (
      <button key={pokemon.name + "-" + pokemon.id} className="pokemon-card" onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
        <img src={pokemon.sprite} alt={pokemon.name} />
        <span>No.{pokemon.id}</span>
        <h3>{pokemon.koreanName}</h3>
        <p>{pokemon.types.join(" / ")}</p>
      </button>
    ))}
    <div ref={loadMoreRef}></div>
    {loadingDetail || isFetchingNextPage ? <p>불러오는 중...</p> : null}
  </div>
  )
}
