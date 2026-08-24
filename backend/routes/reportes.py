from flask import Blueprint, jsonify
from database import get_connection


reportes_bp = Blueprint("reportes", __name__)


@reportes_bp.route("/api/reportes/ventas-total")
def ventas_total():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT SUM(total) AS ventas_totales
        FROM ventas
    """)

    resultado = cursor.fetchone()

    cursor.close()
    connection.close()

    return jsonify(resultado)



@reportes_bp.route("/api/reportes/producto-mas-vendido")
def producto_mas_vendido():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            productos.nombre_producto,
            SUM(detalle_ventas.cantidad) AS cantidad_vendida

        FROM detalle_ventas

        INNER JOIN productos
        ON detalle_ventas.id_producto = productos.id_producto

        GROUP BY productos.nombre_producto

        ORDER BY cantidad_vendida DESC

        LIMIT 1
    """)

    resultado = cursor.fetchone()

    cursor.close()
    connection.close()

    return jsonify(resultado)

@reportes_bp.route("/api/reportes/total-clientes")
def total_clientes():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT COUNT(*) AS total_clientes
        FROM clientes
                   """)
    
    resultado = cursor.fetchone()

    cursor.close()
    connection.close()

    return jsonify(resultado)


@reportes_bp.route("/api/reportes/total-productos")
def total_productos():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT COUNT(*) AS total_productos
        FROM productos           
                   """)
    
    resultado = cursor.fetchone()

    cursor.close()
    connection.close()

    return jsonify(resultado)