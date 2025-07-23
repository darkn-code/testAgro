import subprocess
import psycopg2
import os
import threading
import sys
import bcrypt
from psycopg2.extras import RealDictCursor
from flask import Flask, jsonify, request
from db import get_db_connection
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.debug = True
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'fotos_usuarios')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return "¡Backend funcionando!" 

@app.route('/api/usuarios', methods=['GET'])
def get_items():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM usuarios;')
    items = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(items)

#ruta para creacion de cuenta de usuarios
@app.route('/api/usuarios', methods=['POST'])
def add_item():
    try:
        print(request.form)

        nombre = request.form.get('nombre')
        apellido_paterno = request.form.get('apellido_paterno')
        apellido_materno = request.form.get('apellido_materno')
        edad = request.form.get('edad')
        usuario = request.form.get('usuario')
        contrasena_plana = request.form.get('contrasena')
        contrasena_encriptada = bcrypt.hashpw(contrasena_plana.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        tipousuario = request.form.get('tipousuario')

        foto = request.files.get('foto')
        ruta_foto_db = None

        if foto and foto.filename != '':
            filename = secure_filename(foto.filename)
            ruta_foto = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            foto.save(ruta_foto)
            ruta_foto_db = f'/static/fotos_usuarios/{filename}'

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, edad, usuario, contrasena, ruta_foto, tipo_usuario) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);',(nombre, apellido_paterno, apellido_materno, edad, usuario, contrasena_encriptada, ruta_foto_db, tipousuario))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({'message': 'Usuario creado correctamente', 'ruta_foto': ruta_foto_db})

    except Exception as e:
        print(f'Error al crear usuario: {e}')
        return jsonify({'error': f'Error al crear usuario: {str(e)}'}), 500

#ruta para que los usuarios hagan login
@app.route('/api/login', methods=['POST'])
def login():
    print("Hola")
    data = request.json
    usuario = data.get('usuario')
    contrasena = data.get('contrasena')

    if not usuario or not contrasena:
        return jsonify({'error': 'Faltan datos'}), 400

    try:
        print("Hola")
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id_usuario, nombre, apellido_paterno, apellido_materno, usuario, contrasena, tipo_usuario FROM usuarios WHERE usuario = %s", (usuario,))
        user = cur.fetchone()
        cur.close()
        conn.close()

        print("Se cerro la base de datos")
        if user and bcrypt.checkpw(contrasena, user[5]):
            user_data = {
                'id': user[0],
                'nombre': user[1],
                'apellido_paterno': user[2],
                'apellido_materno': user[3],
                'usuario': user[4],
                'tipo_usuario': user[6]
            }
            return jsonify({'message': 'Login exitoso', 'user': user_data}), 200
        else:
            return jsonify({'error': 'Usuario o contraseña incorrectos'}), 401

    except Exception as e:
        print(e)
        return jsonify({'error': f'Error del servidor: {str(e)}'}), 500

#ruta para monitoreo
@app.route('/api/registrar_ip', methods=['POST'])
def registrar_ip():
    ip = request.form.get('ip')
    if not ip:
        return jsonify({'error': 'Falta el parámetro ip'}), 400
    
    try:
        with open('ip_esp32.txt', 'w') as f:
            f.write(ip)
        return jsonify({'message': f'IP {ip} guardada correctamente'}), 200
    except Exception as e:
        return jsonify({'error': f'No se pudo guardar la IP: {str(e)}'}), 500
    
@app.route('/api/monitoreo/iniciar', methods=['GET'])
def iniciar_monitoreo():
    def ejecutar_script():
        python_path = sys.executable
        ruta_prueba = os.path.join(BASE_DIR, 'prueba.py')
        subprocess.call([python_path, ruta_prueba])
    thread = threading.Thread(target=ejecutar_script)
    thread.daemon = True
    thread.start()
    return jsonify({'mensaje': 'Monitoreo iniciado correctamente'}), 200

#ruta para retomar datos de la base de datos, mostrarlos en la página de perfil y actualizarlos
@app.route('/api/usuario/<username>', methods=['GET'])
def obtener_usuario(username):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT nombre, apellido_paterno, apellido_materno, edad, usuario, contrasena, ruta_foto FROM usuarios WHERE usuario = %s", (username,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        return jsonify(user)
    else:
        return jsonify({'error': 'Usuario no encontrado'}), 404
    
@app.route('/api/usuario/<username>', methods=['PUT'])
def actualizar_usuario(username):
    data = request.json
    
    campos = [
        data['nombre'],
        data['apellido_paterno'],
        data['apellido_materno'],
        data['edad'],
        data['usuario']]
    
    consulta = """UPDATE usuarios SET nombre = %s, apellido_paterno = %s, apellido_materno = %s,
            edad = %s, usuario = %s"""
    if data['contrasena']:
        contrasena_encriptada = bcrypt.hashpw(data['contrasena'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        consulta += ", contrasena = %s"
        campos.append(contrasena_encriptada)
    consulta += " WHERE usuario = %s"
    campos.append(username)

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(consulta, tuple(campos))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"mensaje": "Datos actualizados correctamente"})

@app.route('/api/usuario/<username>/foto', methods=['POST'])
def subir_foto(username):
    if 'foto' not in request.files:
        return jsonify({'error': 'No se subió ningún archivo'}), 400

    archivo = request.files['foto']
    if archivo.filename == '':
        return jsonify({'error': 'Nombre de archivo vacío'}), 400
    
    if not allowed_file(archivo.filename):
        return jsonify({'error': 'Formato de archivo no permitido. Usa JPG, JPEG o PNG'}), 400

    nombre_archivo = secure_filename(archivo.filename)
    ruta_guardado = os.path.join(app.config['UPLOAD_FOLDER'], nombre_archivo)
    archivo.save(ruta_guardado)

    ruta_bd = f'/static/fotos_usuarios/{nombre_archivo}'
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE usuarios SET ruta_foto = %s WHERE usuario = %s", (ruta_bd, username))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'mensaje': 'Imagen actualizada', 'ruta_foto': ruta_bd})

#ruta para guardar datos de la tabla cultivos
@app.route('/api/cultivos', methods=['POST'])
def guardar_cultivos():
    try:
        registros = request.get_json()
        
        if not registros or not isinstance(registros, list):
            return jsonify({'error': 'Formato de datos incorrecto'}), 400
        conn = get_db_connection()
        cur = conn.cursor()

        for fila in registros:
            if len(fila) != 13:
                return jsonify({'error': 'Cada fila debe tener 13 valores'}), 400
            (nombre_cultivo, tipo_cultivo, descripcion_cultivo,
             nombre_plaga, tipo_plaga, descripcion_plaga,
             nombre_tratamiento, tipo_tratamiento, descripcion_tratamiento,
             porcentaje_plaga,
             nombre_parcela, descripcion_parcela, descripcion_ubicacion
            ) = fila
            id_usuario = 1

            cur.execute("""INSERT INTO ubicacion (descripcion_ubicacion) VALUES (%s) ON CONFLICT (descripcion_ubicacion) DO NOTHING RETURNING id_ubicacion""", (descripcion_ubicacion,))
            result = cur.fetchone()
            if result:
                id_ubicacion = result[0]
            else:
                cur.execute("SELECT id_ubicacion FROM ubicacion WHERE descripcion_ubicacion = %s", (descripcion_ubicacion,))
                id_ubicacion = cur.fetchone()[0]

            cur.execute("""INSERT INTO cultivos (nombre_cultivo, tipo_cultivo, descripcion_cultivo, id_usuario, id_ubicacion) VALUES (%s, %s, %s, %s, %s) RETURNING id_cultivo""", (nombre_cultivo, tipo_cultivo, descripcion_cultivo, id_usuario, id_ubicacion))
            id_cultivo = cur.fetchone()[0]

            cur.execute("""INSERT INTO plaga (nombre_plaga, tipo_plaga, descripcion_plaga, porcentaje_plaga, id_cultivo) VALUES (%s, %s, %s, %s, %s) RETURNING id_plaga""", (nombre_plaga, tipo_plaga, descripcion_plaga, porcentaje_plaga, id_cultivo))
            id_plaga = cur.fetchone()[0]

            cur.execute("""INSERT INTO tratamiento (nombre_tratamiento, tipo_tratamiento, descripcion_tratamiento, id_cultivo) VALUES (%s, %s, %s, %s) RETURNING id_tratamiento""", (nombre_tratamiento, tipo_tratamiento, descripcion_tratamiento, id_cultivo))
            id_tratamiento = cur.fetchone()[0]

            cur.execute("""INSERT INTO parcela (nombre_parcela, descripcion_parcela, id_cultivo, id_plaga, id_tratamiento, id_ubicacion) VALUES (%s, %s, %s, %s, %s, %s)""", (nombre_parcela, descripcion_parcela, id_cultivo, id_plaga, id_tratamiento, id_ubicacion))

        conn.commit()
        cur.close()
        conn.close()
        return jsonify({'mensaje': 'Registros guardados correctamente'}), 200

    except Exception as e:
        print(f"Error al guardar cultivos: {e}")
        return jsonify({'error': f'Error al guardar cultivos: {str(e)}'}), 500

#ruta para modificar datos de la tabla cultivos
@app.route('/api/cultivos', methods=['GET'])
def obtener_cultivos():
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("""SELECT c.id_cultivo, c.nombre_cultivo, c.descripcion_cultivo, p.nombre_plaga, p.tipo_plaga, p.descripcion_plaga, p.porcentaje_plaga, t.nombre_tratamiento, t.tipo_tratamiento, t.descripcion_tratamiento, pa.nombre_parcela, pa.descripcion_parcela, pa.foto_parcela, u.descripcion_ubicacion
                    FROM cultivos c 
                    JOIN plaga p ON c.id_cultivo = p.id_cultivo
                    JOIN tratamiento t ON c.id_cultivo = t.id_cultivo
                    JOIN parcela pa ON c.id_cultivo = pa.id_cultivo
                    JOIN ubicacion u ON c.id_ubicacion = u.id_ubicacion""")
        cultivos = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(cultivos)
    except Exception as e:
        return jsonify({'error': f'Error al obtener cultivos: {str(e)}'}), 500

#ruta para eliminar datos de la tabla cultivos
@app.route('/api/cultivos/<int:id_cultivo>', methods=['DELETE'])
def eliminar_cultivo(id_cultivo):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("DELETE FROM parcela WHERE id_cultivo = %s", (id_cultivo,))
        cur.execute("DELETE FROM tratamiento WHERE id_cultivo = %s", (id_cultivo,))
        cur.execute("DELETE FROM plaga WHERE id_cultivo = %s", (id_cultivo,))
        cur.execute("DELETE FROM cultivos WHERE id_cultivo = %s", (id_cultivo,))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({'mensaje': 'Cultivo eliminado correctamente'}), 200
    except Exception as e:
        return jsonify({'error': f'Error al eliminar cultivo: {str(e)}'}), 500
    
@app.route('/api/cultivos/<int:id_cultivo>', methods=['PUT'])
def actualizar_cultivo(id_cultivo):
    try:
        datos = request.get_json()
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""UPDATE cultivos SET nombre_cultivo = %s, descripcion_cultivo = %s WHERE id_cultivo = %s""", (datos['nombre_cultivo'], datos['descripcion_cultivo'], id_cultivo))
        cur.execute("""UPDATE plaga SET nombre_plaga = %s, tipo_plaga = %s, descripcion_plaga = %s WHERE id_cultivo = %s""", (datos['nombre_plaga'], datos['tipo_plaga'], datos['descripcion_plaga'], id_cultivo))
        cur.execute("""UPDATE tratamiento SET nombre_tratamiento = %s, tipo_tratamiento = %s, descripcion_tratamiento = %s WHERE id_cultivo = %s""", (datos['nombre_tratamiento'], datos['tipo_tratamiento'], datos['descripcion_tratamiento'], id_cultivo))
        cur.execute("""UPDATE parcela SET nombre_parcela = %s, descripcion_parcela = %s, ruta_foto_parcela = %s WHERE id_cultivo = %s""", (datos['nombre_parcela'], datos['descripcion_parcela'], datos['ruta_foto_parcela'], id_cultivo))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'mensaje': 'Cultivo actualizado correctamente'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

