
import "./App.css";
// Import the Router from react-router
import { Routes, Route } from "react-router";
// Import the page components
import Home from "./Pages/Home.jsx"
import AddEmployee from "./Pages/AddEmployee.jsx"
import Login from "./Pages/Login.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;




