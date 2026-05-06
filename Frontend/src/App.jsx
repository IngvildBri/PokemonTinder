import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Pokemonswipe from "./pages/Pokemonswipe";
import Favorites from "./pages/Favorites";
import './App.css';




function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="dashboard" element={<Dashboard />}/>
      <Route path="swipe" element={<Pokemonswipe />}/>
      <Route path="favorites" element={<Favorites />}/>
    </Routes>
  );
}

export default App;
