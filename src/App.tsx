import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '../src/pages/Home'
import CatchPage from './pages/CatchPage';
import Card from "./components/Card"

function App() {
  return (
    <div className='container'>
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
