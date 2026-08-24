import { useState } from "react";

function ModalCliente({ mostrar, cerrar, actualizarClientes }) {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");

    async function guardarCliente() {

        const respuesta = await fetch("http://127.0.0.1:5000/api/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                telefono: telefono
            })
        });

        if (respuesta.ok) {

            actualizarClientes();

            cerrar();

            setNombre("");
            setCorreo("");
            setTelefono("");

        } else {

            alert("Error al guardar el cliente");

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

                        <h5>Nuevo Cliente</h5>

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

                            <label>Correo</label>

                            <input
                                type="email"
                                className="form-control"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Teléfono</label>

                            <input
                                className="form-control"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
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
                            onClick={guardarCliente}
                        >
                            Guardar
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ModalCliente;