import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '../src/pages/Home'
import CatchPage from './pages/CatchPage';
import Card from "../src/components/PokemonCard"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail' element={<CatchPage />} />
          <Route path='/pokemon' element={<Card />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
