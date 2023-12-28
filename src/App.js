import GameDeatail from './pages/GameDeatail';
import './index.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoryGame from './pages/CategoryGame';
import Header from './components/Header';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
        <Header>
          <Routes>
              <Route path="" element={<Home/>}/>
              <Route path="/app/:slug" element={<GameDeatail/>}/>
              <Route path="/category/:slug" element={<CategoryGame/>}/>
              <Route path="/login" element={<Login/>}/>
          </Routes>
        </Header>
    </BrowserRouter>
  );
}

export default App;
