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

const ShapeSelect = () => {
  // useQuery를 사용하여 포켓몬 리스트 비동기 호출
  const { data, isLoading, error } = useQuery({
    queryKey: ["shape-list"],       // 캐싱 키
    queryFn: fetchShape,        // 데이터를 불러오는 함수
  });

  // 사용자가 옵션을 선택했을 때 실행되는 함수
  const handleChange = (selected: ShapeOption | null) => {
    console.log("선택한 외형:", selected?.value);
  };

  // 데이터가 로딩 중일 때 표시
  if (isLoading) return <p>로딩 중...</p>;

  // 에러가 발생했을 때 표시
  if (error) return <p>에러 발생!</p>;

  // 실제 Select 컴포넌트 렌더링
  return (
    <div style={{ width: 300 }}>
      <Select
        options={data}            // API에서 가져온 리스트
        onChange={handleChange}   // 선택했을 때 실행할 함수
        placeholder="외형 선택"  // 입력 전 기본 텍스트
        isClearable               // x 버튼으로 초기화 가능
      />
    </div>
  );
};

export default ShapeSelect;