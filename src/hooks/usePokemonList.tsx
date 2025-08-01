import { useInfiniteQuery } from "@tanstack/react-query";
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
  return useInfiniteQuery<PokemonListResponse>({
    queryKey: ['pokemon'], 
    queryFn: async ({pageParam = 0}) => {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pageParam}`
      );
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * 20;
      return lastPage.next ? nextOffset : undefined;
    },
    initialPageParam: 0,
  });
}
