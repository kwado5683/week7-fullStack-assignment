import Home from "./pages/Home";
import { Route,Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Navbar from "./Components/Navbar";
import "./css/App.css";




export default function App(){



  return(
    <div>
      <Navbar />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>


      </main>
    </div>

    
  )
}