import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface TypeOption {
  value: string;
  label: string;
};

const TYPE_KO_MAP: Record<string, string> = {
  normal: "노말",
  fire: "불꽃",
  water: "물",
  electric: "전기",
  grass: "풀",
  ice: "얼음",
  fighting: "격투",
  poison: "독",
  ground: "땅",
  flying: "비행",
  psychic: "에스퍼",
  bug: "벌레",
  rock: "바위",
  ghost: "고스트",
  dragon: "드래곤",
  dark: "악",
  steel: "강철",
  fairy: "페어리",
  shadow: "다크",
  unknown: "알 수 없음",
};


const fetchType = async ():Promise<TypeOption[]> => {
  const res = await axios.get('https://pokeapi.co/api/v2/type?limit=21');

  return res.data.results.map((type: any) => ({
    value: type.name,
    label: TYPE_KO_MAP[type.name] ?? type.name

  }));
};

export const useType = () => {
  return useQuery<TypeOption[]>({
    queryKey: ["type-list"],
    queryFn: fetchType,
  });
};