from database import get_connection

connection = get_connection()

if connection.is_connected():
    print("conexion exitosa a MYSQL")
else:
    print("error de conexion")

connection.close()