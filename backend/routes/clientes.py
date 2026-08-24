from flask import Blueprint, jsonify, request
from database import get_connection


clientes_bp = Blueprint("clientes", __name__)


@clientes_bp.route("/api/clientes")
def listar_clientes():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM clientes")

    datos = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(datos)


@clientes_bp.route("/api/clientes", methods=["POST"])
def crear_cliente():

    datos = request.json

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO clientes
        (nombre, telefono, email)
        VALUES (%s, %s, %s)
    """, (
        datos["nombre"],
        datos["telefono"],
        datos["correo"]
    ))

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "mensaje": "Cliente creado correctamente"
    }), 201


@clientes_bp.route("/api/clientes/<int:id>", methods=["DELETE"])
def eliminar_cliente(id):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM clientes WHERE id_cliente = %s",
        (id,)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "mensaje": "Cliente eliminado correctamente"
    })