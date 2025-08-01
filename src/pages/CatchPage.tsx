import React from "react";
import usePokemonList from "../hooks/usePokemonList";
import useAbilities from "../hooks/useAbilities";
import useGeneration from "../hooks/useGeneration";
import useShape from "../hooks/useShape";
import { useType } from "../hooks/useType";
import { useNavigate } from "react-router";

export default function Detail(){
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  }
  return (
    <div className="detail-container">
      <span>아직테스트중</span>
      <button className="back" onClick={handleClick}>돌아가기</button>
    </div>
  )
}