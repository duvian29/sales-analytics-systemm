from flask import Flask
from flask_cors import CORS
from database import get_connection

from routes.productos import productos_bp
from routes.clientes import clientes_bp
from routes.ventas import ventas_bp
from routes.reportes import reportes_bp
from routes.empleados import empleados_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(productos_bp)
app.register_blueprint(clientes_bp)
app.register_blueprint(ventas_bp)
app.register_blueprint(reportes_bp)
app.register_blueprint(empleados_bp)


      
if __name__== "__main__":
       app.run(debug=True)