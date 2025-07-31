import React from "react";
import Select from 'react-select';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface ShapeOption {
  value: string;
  label: string;
};

interface ShapeSelectProps {
  value: ShapeOption | null;
  onChange: (option: ShapeOption | null) => void;
}

const fetchShape = async ():Promise<ShapeOption[]> => {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon-shape?limit=14');

  return res.data.results.map((shape: any) => ({
    value: shape.name,
    label: shape.name.charAt(0).toUpperCase() + shape.name.slice(1),
  }));
};

const ShapeSelect = (onChange) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["shape-list"],
    queryFn: fetchShape,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생!</p>;

  return (
    <div style={{ width: 300 }}>
      <Select
        options={data}            // API에서 가져온 리스트
        onChange={onChange}   // 선택했을 때 실행할 함수
        placeholder="외형 선택"  // 입력 전 기본 텍스트
        isClearable               // x 버튼으로 초기화 가능
      />
    </div>
  );
};

export default ShapeSelect;