import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function usePokemonList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemon'], 
    queryFn: () => 
      axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        .then(res => res.data),
  });

  console.log(data);

  if (isLoading) return <p> 로딩 중...</p>;
  if (error) return <p> 에러 발생! </p>;

  return (
    <ul>
      {data.results.map((pokemon: any, index: number) => (
        <li key={index}>{pokemon.name}</li>
      ))}
    </ul>
  );
}
