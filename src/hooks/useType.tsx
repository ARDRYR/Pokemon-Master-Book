import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface TypeOption {
  value: string;
  label: string;
};

const fetchType = async ():Promise<TypeOption[]> => {
  const res = await axios.get('https://pokeapi.co/api/v2/type?limit=21');

  return res.data.results.map((type: any) => ({
    value: type.name,
    label: type.name.charAt(0).toUpperCase() + type.name.slice(1),
  }));
};

export const useType = () => {
  return useQuery<TypeOption[]>({
    queryKey: ["type-list"],
    queryFn: fetchType,
  });
};