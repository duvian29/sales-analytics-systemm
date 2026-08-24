from flask import Blueprint, jsonify, request
from database import get_connection


productos_bp = Blueprint("productos", __name__)


@productos_bp.route("/api/productos")
def listar_productos():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM productos")

    datos = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(datos)

@productos_bp.route("/api/productos", methods=["POST"])
def crear_producto():

    datos = request.json

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
                   INSERT INTO productos
                   (nombre_producto, precio, stock)
                   VALUES (%s, %s, %s)
                   """,(
                       datos["nombre_producto"],
                       datos["precio"],
                       datos["stock"]
                   ))
    
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "mensaje": "Producto creado correctamente"
    }),201

@productos_bp.route("/api/productos/<int:id_producto>", methods=["DELETE"])
def eliminar_producto(id_producto):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM productos WHERE id_producto = %s",
        (id_producto,)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "mensaje": "Producto eliminado correctamente"
    })

