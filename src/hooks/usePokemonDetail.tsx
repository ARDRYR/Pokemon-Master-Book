import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PokemonDetail {
  name_en: string;
  name_ko: string;
  id: number;
  types: string[];
  sprite: string;
}

const fetchPokemonDetail = async (name_en: string): Promise<PokemonDetail | null> => {
  try{
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name_en}`);
    const speciesRes = await axios.get(res.data.species.url);

    const nameKoObj = speciesRes.data.names.find(
      (entry: any) => entry.language.name === "ko"
    );

    return {
      name_en,
      name_ko: nameKoObj?.name ?? name_en,
      id: res.data.id,
      types: res.data.types.map((t: any) => t.type.name),
      sprite: res.data.sprites.front_default,
    };
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      console.warn(`⚠️ '${name_en}' 은(는) PokeAPI에 없음 (404)`);
      return null;
    }
    throw err;
  }
};

export const usePokemonDetail = (name_en: string) => {
  return useQuery<PokemonDetail | null>({
    queryKey: ["pokemonDetail", name_en],
    queryFn: () => fetchPokemonDetail(name_en),
    staleTime: 1000 * 60 * 60,
  });
};
