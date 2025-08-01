import { usePokemonDetail } from "../hooks/usePokemonDetail";
import type { LocalizedPokemon } from "../hooks/useLocalizedPokemonList";

interface Props {
  pokemon: Pick<LocalizedPokemon, "name_en" | "name_ko" | "id">;
}

export default function PokemonCard({ pokemon }: Props) {
  if (!pokemon) return null;
  const { data, isLoading, isError } = usePokemonDetail(pokemon);

  if (isLoading) return <div className="pokemon-card">로딩 중...</div>;
  if (isError || !data) return <div className="pokemon-card">에러 발생</div>;

  return (
    <button className="pokemon-card">
      <img src={data.sprite} alt={data.name_ko} />
      <span>No.{data.id}</span>
      <h3>{data.name_ko}</h3>
      <p>{data.types.join(" / ")}</p>
    </button>
  );
}
