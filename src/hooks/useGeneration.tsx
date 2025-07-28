import React from "react";
import Select from 'react-select';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface GenerationOption {
  value: string;
  label: string;
};

interface GenerationSelectProps {
  value: GenerationOption | null;
  onChange: (option: GenerationOption | null) => void;
}

const fetchGeneration = async ():Promise<GenerationOption[]> => {
  const res = await axios.get('https://pokeapi.co/api/v2/generation?limit=9');

  return res.data.results.map((gene: any) => ({
    value: gene.name,
    label: gene.name.charAt(0).toUpperCase() + gene.name.slice(1),
  }));
};

const GenerationSelect = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["generation-list"],
    queryFn: fetchGeneration,
  });

  const handleChange = (selected: GenerationOption | null) => {
    console.log("선택한 세대:", selected?.value);
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생!</p>;
  
  return (
    <div style={{ width: 300 }}>
      <Select
        options={data}            // API에서 가져온 리스트
        onChange={handleChange}   // 선택했을 때 실행할 함수
        placeholder="세대 선택"  // 입력 전 기본 텍스트
        isClearable               // x 버튼으로 초기화 가능
      />
    </div>
  );
};

export default GenerationSelect;