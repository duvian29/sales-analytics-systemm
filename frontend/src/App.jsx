import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Clientes from "./pages/Clientes";
import Ventas from "./pages/Ventas";
import Reportes from "./pages/Reportes";


function App(){

  return (

    <BrowserRouter>

      <Routes>

        <Route 
          path="/" 
          element={<Dashboard />} 
        />

        <Route
          path="/productos"
          element={<Productos />}
        />

        <Route
          path="/clientes"
          element={<Clientes />}
        />

        <Route
        path="/ventas"
        element={<Ventas />}
        />

        <Route
        path="/reportes"
        element={<Reportes />}
        />

      </Routes>

    </BrowserRouter>

  )

}


export default App;