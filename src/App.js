import GameDeatail from './pages/GameDeatail';
import './index.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoryGame from './pages/CategoryGame';

function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route path="" element={<Home/>}/>
              <Route path="/app/:slug" element={<GameDeatail/>}/>
              <Route path="/category/:slug" element={<CategoryGame/>}/>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
