import mysql.connector

def get_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Duvi2908.",
        database="sales_analytics"
    )

    return connection