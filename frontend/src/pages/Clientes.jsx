import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import ModalCliente from "../components/ModalCliente";

function Clientes() {

    const [clientes, setClientes] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    function cargarClientes() {
        fetch("http://127.0.0.1:5000/api/clientes")
            .then((response) => response.json())
            .then((data) => {

                console.log(data);

                setClientes(data);
            });
    }

    async function eliminarCliente(id) {

       if (!window.confirm("¿Desea eliminar este cliente?")) {
           return;
        }

        const respuesta = await fetch(
            `http://127.0.0.1:5000/api/clientes/${id}`,
           {
               method: "DELETE"
            }
        );

        if (respuesta.ok) {
            cargarClientes();
        } else {
            alert("No se pudo eliminar el cliente");
        }

    }

    useEffect(() => {
        cargarClientes();
    }, []);

    return (

        <Layout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2> Clientes </h2>

                <button className="btn btn-primary"
                onClick={() => setMostrarModal(true)}>

                    + Nuevo Cliente
                </button>
            </div>

            <table className="table table-striped table-hover shadow">

                <thead className="table-dark">

                    <tr>

                        <th> ID </th>
                        <th> Nombre </th>
                        <th> Correo </th>
                        <th> Telefono </th>
                        <th> Acciones </th>

                    </tr>

                </thead>

                <tbody>

                    {clientes.map((cliente) => (
                        <tr key={cliente.id_cliente}>

                            <td>{cliente.id_cliente}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefono}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2">
                                    Editar
                                </button>

                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => eliminarCliente(cliente.id_cliente)}
                                >
                                  Eliminar
                                </button>
                                
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <ModalCliente
             mostrar={mostrarModal}
             cerrar={() => setMostrarModal(false)}
             actualizarClientes={cargarClientes}
            />

        </Layout>
    );

    
}

export default Clientes;