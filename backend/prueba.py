import cv2
import time
import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk
import threading
import os

try:
    with open("ip_esp32.txt", "r") as archivo:
        ip = archivo.read().strip()
        url = f"http://{ip}/"
except FileNotFoundError:
    messagebox.showerror("Error", "No se encontró el archivo ip_esp32.txt")
    exit()

ruta = "C:/Users/DANIELAGUADALUPEAGUI/OneDrive - TECNOLOGICO DE ESTUDIOS SUPERIORES DE IXTAPALUCA/Documentos/MOVILIDAD_ESTUDIANTIL_CICATA_TESI/proyectoinnovatecnm/backend/automatica"
os.makedirs(ruta, exist_ok = True)

cap = None
frame_actual = None
ejecutando = True   

ventana = tk.Tk()
ventana.title("Monitoreo de cultivo")

etiqueta_video = tk.Label(ventana)
etiqueta_video.pack()

def guardado_automatico():
        if frame_actual is not None:
            timestamp = time.strftime("%Y%m%d-%H%M%S")
            filename =  os.path.join(ruta, f"captura_{timestamp}.jpg")
            cv2.imwrite(filename, frame_actual)
            messagebox.showinfo("Imagen guardada", f"Imagen guardada como:\n{filename}")
        else:
            messagebox.showwarning("Error", "No hay imagen para guardar")

def iniciar_guardado_periodico(intervalo=10):
    def tarea():
        while ejecutando:
            guardado_automatico()
            time.sleep(intervalo)
    threading.Thread(target=tarea, daemon=True).start()

def cerrar_ventana():
    global ejecutando
    ejecutando = False
    if cap:
        cap.release()
    ventana.destroy()

boton_cerrar = tk.Button(ventana, text="Cerrar", command=cerrar_ventana, bg="red", fg="white")
boton_cerrar.pack(pady=5)

def abrir_stream(retries=5, delay=2):
    for i in range(retries):
        cap = cv2.VideoCapture(url)
        if cap.isOpened():
            print(f"Conectado al stream en el intento  {i+1}")
            return cap
        print(f"no se pudo abrir el stream (intento {i+1}/{retries})")
        cap.release()
        time.sleep(delay)
    return None

def actualizar_video():
    global cap, frame_actual
    if cap is None:
          cap = abrir_stream()
          if cap is None:
               ventana.after(1000, actualizar_video)
               return
    ret, frame = cap.read()
    if ret:
        frame_actual = frame.copy()
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        imagen = ImageTk.PhotoImage(Image.fromarray(frame_rgb))
        etiqueta_video.configure(image=imagen)
        etiqueta_video.image = imagen
    else:
        cap.release()
        cap = None
    if ejecutando:
        ventana.after(30, actualizar_video)

ventana.protocol("WM_DELETE_WINDOW", cerrar_ventana)
actualizar_video()
iniciar_guardado_periodico(10)
ventana.mainloop()
