import { useState, useEffect } from "react";

function ModalProducto({
    mostrar,
    cerrar,
    actualizarProductos,
    productoEditar
}) {

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {

    if (productoEditar) {

        setNombre(productoEditar.nombre_producto);
        setPrecio(productoEditar.precio);
        setStock(productoEditar.stock);

    } else {

        setNombre("");
        setPrecio("");
        setStock("");

    }

}, [productoEditar]);

    async function guardarProducto() {

        const respuesta = await fetch("http://127.0.0.1:5000/api/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre_producto: nombre,
                precio: precio,
                stock: stock
            })
        });

        if (respuesta.ok) {

            actualizarProductos();

            cerrar();

            setNombre("");
            setPrecio("");
            setStock("");

        } else {

            alert("Error al guardar el producto");

        }

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

                        <h5>Nuevo Producto</h5>

                        <button
                            className="btn-close"
                            onClick={cerrar}
                        ></button>

                    </div>

                    <div className="modal-body">

                        <div className="mb-3">

                            <label>Nombre</label>

                            <input
                                className="form-control"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Precio</label>

                            <input
                                type="number"
                                className="form-control"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Stock</label>

                            <input
                                type="number"
                                className="form-control"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
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
                           onClick={guardarProducto}
                        >
                              Guardar
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ModalProducto;