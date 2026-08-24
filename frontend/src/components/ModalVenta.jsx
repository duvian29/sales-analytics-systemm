import { useEffect, useState } from "react";

function ModalVenta({ mostrar, cerrar, actualizarVentas }) {

    const [clientes, setClientes] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [productos, setProductos] = useState([]);

    const [idCliente, setIdCliente] = useState("");
    const [idEmpleado, setIdEmpleado] = useState("");
    const [idProducto, setIdProducto] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        fetch("http://127.0.0.1:5000/api/clientes")
            .then((response) => response.json())
            .then((data) => {
                setClientes(data);
            });

        fetch("http://127.0.0.1:5000/api/productos")
            .then((response) => response.json())
            .then((data) => {
                setProductos(data);
            });

        fetch("http://127.0.0.1:5000/api/empleados")
            .then((response) => response.json())
            .then((data) => {
                setEmpleados(data);
            });

    }, []);

    useEffect(() => {

        const productoSeleccionado = productos.find(
            (producto) => producto.id_producto == idProducto
        );

        if (productoSeleccionado) {

            setTotal(productoSeleccionado.precio * cantidad);

        } else {

            setTotal(0);

        }

    }, [idProducto, cantidad, productos]);

    async function guardarVenta() {

        const respuesta = await fetch("http://127.0.0.1:5000/api/ventas", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                id_cliente: idCliente,
                id_empleado: idEmpleado,
                id_producto: idProducto,
                cantidad: cantidad,
                total: total

            })

        });

        const data = await respuesta.json();

        alert(data.mensaje);

        actualizarVentas();

        cerrar();

    }

    if (!mostrar) return null;

    return (

        <div
            className="modal d-block"
            style={{ backgroundColor: "rgba(0,0,0,.5)" }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>Nueva Venta</h5>

                        <button
                            className="btn-close"
                            onClick={cerrar}
                        ></button>

                    </div>

                    <div className="modal-body">

                        <div className="mb-3">

                            <label>Cliente</label>

                            <select
                                className="form-select"
                                value={idCliente}
                                onChange={(e) => setIdCliente(e.target.value)}
                            >

                                <option value="">
                                    Seleccione un cliente
                                </option>

                                {clientes.map((cliente) => (

                                    <option
                                        key={cliente.id_cliente}
                                        value={cliente.id_cliente}
                                    >
                                        {cliente.nombre}
                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="mb-3">

                            <label>Empleado</label>

                            <select
                                className="form-select"
                                value={idEmpleado}
                                onChange={(e) => setIdEmpleado(e.target.value)}
                            >

                                <option value="">
                                    Seleccione un empleado
                                </option>

                                {empleados.map((empleado) => (

                                    <option
                                        key={empleado.id_empleado}
                                        value={empleado.id_empleado}
                                    >
                                        {empleado.nombre}
                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="mb-3">

                            <label>Producto</label>

                            <select
                                className="form-select"
                                value={idProducto}
                                onChange={(e) => setIdProducto(e.target.value)}
                            >

                                <option value="">
                                    Seleccione un producto
                                </option>

                                {productos.map((producto) => (

                                    <option
                                        key={producto.id_producto}
                                        value={producto.id_producto}
                                    >
                                        {producto.nombre_producto}
                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="mb-3">

                            <label>Cantidad</label>

                            <input
                                type="number"
                                className="form-control"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Total</label>

                            <input
                                className="form-control"
                                value={`$${Number(total).toLocaleString("es-CO")}`}
                                readOnly
                            />

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={cerrar}
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={guardarVenta}
                        >
                            Guardar
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ModalVenta;