import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '../src/pages/Home'
import DetailPage from '../src/pages/DetailPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail' element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
