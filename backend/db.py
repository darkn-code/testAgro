import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    conn = psycopg2.connect(
        host= "192.168.50.247",
        database= "postgres",
        user= "postgres",
        password= "1234567890"
    )
    return conn
