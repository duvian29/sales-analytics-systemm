import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import CardInfo from "../components/CardInfo";

function Dashboard() {

    const [ventasTotales, setVentasTotales] = useState(0);
    const [totalClientes, setTotalClientes] = useState(0);
    const [totalProductos, setTotalProductos] = useState(0);

    useEffect(() => {

        fetch("http://127.0.0.1:5000/api/reportes/ventas-total")
            .then((response) => response.json())
            .then((data) => {
                setVentasTotales(Number(data.ventas_totales));
            });

        fetch("http://127.0.0.1:5000/api/reportes/total-clientes")
            .then((response) => response.json())
            .then((data) => {
                setTotalClientes(data.total_clientes);
            });

        fetch("http://127.0.0.1:5000/api/reportes/total-productos")
            .then((response) => response.json())
            .then((data) => {
                setTotalProductos(data.total_productos);
            });

    }, []);

    return (

        <Layout>

            <h2 className="mb-4">
                Dashboard
            </h2>

            <div className="row">

                <div className="col-md-4">

                    <CardInfo
                        titulo="Ventas Totales"
                        valor={`$ ${ventasTotales.toLocaleString("es-CO")}`}
                    />

                </div>

                <div className="col-md-4">

                    <CardInfo
                        titulo="Clientes"
                        valor={totalClientes}
                    />

                </div>

                <div className="col-md-4">

                    <CardInfo
                        titulo="Productos"
                        valor={totalProductos}
                    />

                </div>

            </div>

        </Layout>

    );

}

export default Dashboard;