import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import ModalProducto from "../components/ModalProducto";

function Productos() {

    const [productos, setProductos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [productoEditar, setProductoEditar] = useState(null);


    function cargarProductos() {

        fetch("http://127.0.0.1:5000/api/productos")
            .then((response) => response.json())
            .then((data) => {

                console.log(data);

                setProductos(data);

            });

    }

    async function eliminarProducto(id) {
        const confirmar = window.confirm(
            "esta seguro de eliminar este producto?"
        );

        if(!confirmar) return;

        const respuesta = await fetch(
              `http://127.0.0.1:5000/api/productos/${id}`,
          {
              method: "DELETE"
          }
        );

        if(respuesta.ok) {
            cargarProductos();

        }else {
            alert("no se puedo eliminar el producto");
        }
    }


    useEffect(() => {

        cargarProductos();

    }, []);

    return (

        <Layout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Productos</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => setMostrarModal(true)}
                >
                    + Nuevo Producto
                </button>

            </div>

            <table className="table table-striped table-hover shadow">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {productos.map((producto) => (

                        <tr key={producto.id_producto}>

                            <td>{producto.id_producto}</td>

                            <td>{producto.nombre_producto}</td>

                            <td>
                                ${Number(producto.precio).toLocaleString("es-CO")}
                            </td>

                            <td>{producto.stock}</td>

                            <td>

                               <button
                                 className="btn btn-warning btn-sm me-2"
                                 onClick={() => {

                                    setProductoEditar(producto);

                                    setMostrarModal(true);

                                 }}
                                >
                                       Editar
                                </button>

                                <button
                                 className="btn btn-danger btn-sm"
                                 onClick={() => eliminarProducto(producto.id_producto)}
                                >
                                  Eliminar
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <ModalProducto
                mostrar={mostrarModal}
                cerrar={() => {
                  setMostrarModal(false);
                  setProductoEditar(null);
                }}
                actualizarProductos={cargarProductos}
                productoEditar={productoEditar}
            />

        </Layout>

    );

}

export default Productos;