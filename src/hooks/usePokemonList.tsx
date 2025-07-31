import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface PokemonList{
  name: string;
  url: string;
}

interface PokemonListResponse{
  count: number;
  next: string;
  previous: string;
  results: PokemonList[];
}

export default function usePokemonList() {
  return useQuery<PokemonListResponse>({
    queryKey: ['pokemon'], 
    queryFn: async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
      return res.data;
    }
  });
}
