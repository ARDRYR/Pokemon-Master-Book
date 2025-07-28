import React from 'react';
import Home from '../src/pages/Home'
import PokemonList from '../src/hooks/usePokemonList'; // 경로 확인 필요

function App() {
  return (
    <div>
      <Home />
      <PokemonList />
    </div>
  );
}

export default App;
