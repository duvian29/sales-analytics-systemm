import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import ModalVenta from "../components/ModalVenta";

function Ventas() {

    const [ventas, setVentas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    function cargarVentas() {

        fetch("http://127.0.0.1:5000/api/ventas")
            .then((response) => response.json())
            .then((data) => {

                console.log(data);

                setVentas(data);

            });

    }

    useEffect(() => {

        cargarVentas();

    }, []);

    return (

        <Layout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Ventas</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => setMostrarModal(true)}
                >
                    + Nueva Venta
                </button>

            </div>

            <table className="table table-striped table-hover shadow">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {ventas.map((venta) => (

                        <tr key={venta.id_venta}>

                            <td>{venta.id_venta}</td>
                            <td>{venta.nombre}</td>
                            <td>{new Date(venta.fecha).toLocaleDateString("es-CO")}</td>
                            <td>
                                ${Number(venta.total).toLocaleString("es-CO")}
                            </td>

                            <td>

                                <button className="btn btn-info btn-sm">
                                    Ver
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <ModalVenta
                mostrar={mostrarModal}
                cerrar={() => setMostrarModal(false)}
                actualizarVentas={cargarVentas}
            />

        </Layout>

    );

}

export default Ventas;