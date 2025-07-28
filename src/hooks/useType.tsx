import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface TypeOption {
  value: string;
  label: string;
};

interface TypeSelectProps {

}

const fetchType = async ():Promise<TypeOption[]> => {
  const res = await axios.get('https://pokeapi.co/api/v2/type?limit=21');

  return res.data.results.map((type: any) => ({
    value: type.name,
    label: type.name.charAt(0).toUpperCase() + type.name.slice(1),
  }));
};

const TypeSelect = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["type-list"],
    queryFn: fetchType,
  });

  const handleChange = (selected: TypeOption | null) => {
    console.log("선택한 타입:", selected?.value);
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생!</p>;

  return (
    <div>
//여기에 이제 받아온 모든 타입 버튼을 만들어줘야함.
    </div>
  );
};

export default TypeSelect;
