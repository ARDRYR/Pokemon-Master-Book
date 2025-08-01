import { useQuery } from "@tanstack/react-query";
import type { LocalizedPokemon } from "./useLocalizedPokemonList";
import axios from "axios";

interface PokemonDetail {
  name_en: string;
  name_ko: string;
  id: number;
  types: string[];
  sprite: string;
}

const fetchPokemonDetail = async (pokemon: Pick<LocalizedPokemon, "name_en" | "name_ko" | "id">): Promise<PokemonDetail | null> => {
  try{
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
    const speciesRes = await axios.get(res.data.species.url);

    const nameKoObj = speciesRes.data.names.find(
      (entry: any) => entry.language.name === "ko"
    );

    return {
      name_en: pokemon.name_en,
      name_ko: pokemon.name_ko,
      id: pokemon.id,
      types: res.data.types.map((t: any) => t.type.name),
      sprite: res.data.sprites.front_default,
    };
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      console.warn(`⚠️ '${pokemon.name_en}' 은(는) PokeAPI에 없음 (404)`);
      return null;
    }
    throw err;
  }
};

export const usePokemonDetail = (pokemon: Pick<LocalizedPokemon, "name_en" | "name_ko" | "id">) => {
  return useQuery<PokemonDetail | null>({
    queryKey: ["pokemonDetail", pokemon.name_en],
    queryFn: () => fetchPokemonDetail(pokemon),
    staleTime: 1000 * 60 * 60,
  });
};
