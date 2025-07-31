import React from "react";
import Select from 'react-select';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface AbilityOption {
  value: string;
  label: string;
};

interface AbilitySelectProps {
  value: AbilityOption | null;
  onChange: (option: AbilityOption | null) => void;
}

const fetchAbilities = async ():Promise<AbilityOption[]> => {
  const res = await axios.get('https://pokeapi.co/api/v2/ability?limit=327');

  return res.data.results.map((poke: any) => ({
    value: poke.name,
    label: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
  }));
};

const AbilitiesSelect = (onChange) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon-list"],
    queryFn: fetchAbilities,
  });

  /*
  const handleChange = (selected: AbilityOption | null) => {
    console.log("선택한 특성:", selected?.value);
  };
*/
  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생!</p>;

  return (
    <div style={{ width: 300 }}>
      <Select
        options={data}            // API에서 가져온 리스트
        onChange={onChange}   // 선택했을 때 실행할 함수
        placeholder="특성 선택"  // 입력 전 기본 텍스트
        isClearable               // x 버튼으로 초기화 가능
      />
    </div>
  );
};

export default AbilitiesSelect;
