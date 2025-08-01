import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface LocalizedPokemon {
  id: number;
  name_ko: string;
  name_en: string;
};

const fetchLocalizedPokemonList = async (): Promise<LocalizedPokemon[]> => {
  const res = await axios.get("https://pokeapi.co/api/v2/pokemon-species?limit=10000");
  const speciesList = res.data.results as { name: string, url: string }[];

  const detailedList = await Promise.all(
    speciesList.map(async (species) => {
      try {
        const { data } = await axios.get(species.url);
        const nameKoObj = data.names.find((n: any) => n.language.name === "ko");

        return {
          id: data.id,
          name_ko: nameKoObj?.name || data.name,
          name_en: data.name,
        };
      } catch (error) {
        console.warn(`species 불러오기 실패: ${species.name}`, error);
        return null;
      }
    })
  );

  return detailedList.filter((p): p is LocalizedPokemon => p !== null);
};

export const useLocalizedPokemonList = () => {
  return useQuery({
    queryKey: ["localizedPokemonList"],
    queryFn: fetchLocalizedPokemonList,
    staleTime: Infinity,
  });
};
