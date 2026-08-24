from flask import Blueprint, jsonify
from database import get_connection

empleados_bp = Blueprint("empleados", __name__)

@empleados_bp.route("/api/empleados")
def listar_empleados():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM empleados")

    datos = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(datos)