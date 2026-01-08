import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Analytics from "./pages/Analytics";

function App() {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = () => {
    axios
      .get("http://localhost:5000/companies")
      .then(res => setCompanies(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard companies={companies} />}
        />
        <Route
          path="/companies"
          element={
            <Companies
              companies={companies}
              fetchCompanies={fetchCompanies}
            />
          }
        />
        <Route
          path="/analytics"
          element={<Analytics companies={companies} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
