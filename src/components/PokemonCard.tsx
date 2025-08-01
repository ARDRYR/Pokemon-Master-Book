import { usePokemonDetail } from "../hooks/usePokemonDetail";

interface Props {
  name_en: string;
}

export default function PokemonCard({ name_en }: Props) {
  const { data, isLoading, isError } = usePokemonDetail(name_en);

  if (isLoading) return <div className="pokemon-card">로딩 중...</div>;
  if (isError || !data) return <div className="pokemon-card">에러 발생</div>;

  return (
    <button
      className="pokemon-card"
      onClick={() => console.log(`${data.name_ko} 클릭됨!`)}
    >
      <img src={data.sprite} alt={data.name_ko} />
      <span>No.{data.id}</span>
      <h3>{data.name_ko}</h3>
      <p>{data.types.join(" / ")}</p>
    </button>
  );
}
