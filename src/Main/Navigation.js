import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Store_Creation from "../Store/Store_Creation";
import OwnResto from "../Store/OwnResto";

function Nagivation() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Store Creation</Link>
          </li>
          <li>
            <Link to="/own-resto">Own Resto</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Store_Creation />} />
        <Route path="/own-resto" element={<OwnResto />} />
      </Routes>
    </Router>
  );
}

export default Nagivation;
