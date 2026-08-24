from flask import Blueprint, jsonify, request
from datetime import date
from database import get_connection


ventas_bp = Blueprint("ventas", __name__)


@ventas_bp.route("/api/ventas")
def listar_ventas():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
    SELECT
        ventas.id_venta,
        clientes.nombre,
        ventas.fecha_venta AS fecha,
        ventas.total

    FROM ventas

    INNER JOIN clientes
    ON ventas.id_cliente = clientes.id_cliente

    ORDER BY ventas.id_venta DESC;
    """

    cursor.execute(query)

    datos = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(datos)


@ventas_bp.route("/api/ventas", methods=["POST"])
def crear_venta():

    datos = request.json

    connection = get_connection()
    cursor = connection.cursor()

    # Insertar venta
    cursor.execute("""
        INSERT INTO ventas
        (fecha_venta, total, id_cliente, id_empleado)
        VALUES (%s, %s, %s, %s)
    """, (
        date.today(),
        datos["total"],
        datos["id_cliente"],
        datos["id_empleado"]
    ))

    id_venta = cursor.lastrowid

    # Obtener el precio del producto
    cursor.execute("""
        SELECT precio
        FROM productos
        WHERE id_producto = %s
    """, (datos["id_producto"],))

    precio = cursor.fetchone()[0]

    # Insertar detalle de la venta
    cursor.execute("""
        INSERT INTO detalle_ventas
        (id_venta, id_producto, cantidad, precio_unitario)
        VALUES (%s, %s, %s, %s)
    """, (
        id_venta,
        datos["id_producto"],
        datos["cantidad"],
        precio
    ))

    # Actualizar stock del producto
    cursor.execute("""
        UPDATE productos
        SET stock = stock - %s
        WHERE id_producto = %s
    """, (
        datos["cantidad"],
        datos["id_producto"]
    ))

    # Actualizar inventario
    cursor.execute("""
        UPDATE inventario
        SET cantidad = cantidad - %s,
            fecha_actualizacion = %s
        WHERE id_producto = %s
    """, (
        datos["cantidad"],
        date.today(),
        datos["id_producto"]
    ))

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "mensaje": "Venta registrada correctamente"
    }), 201