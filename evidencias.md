## 1. Protección de la rama main

Se configuró la rama `main` para que los cambios no puedan ingresar directamente
y deban realizarse mediante Pull Request.

Al intentar realizar un push directo a `main`, GitHub rechazó la operación,
comprobando que la protección estaba funcionando correctamente.


---

## 2. Conflicto entre dos ramas

Para probar el manejo de conflictos se crearon dos ramas que modificaban
la misma línea del archivo `README.md`.

Luego de integrar una de las ramas a `main`, GitHub detectó que la segunda
rama ya no podía mergearse automáticamente porque ambas versiones
modificaban el mismo contenido.


---

## 3. Resolución del conflicto

GitHub mostró los marcadores del conflicto indicando las dos versiones
posibles del contenido.

Se revisaron ambas versiones, se decidió qué contenido conservar y se
eliminaron los marcadores del conflicto antes de completar el merge.


---

## 4. Tag y Release v1.0.0

Una vez terminado el flujo de trabajo se creó el tag `v1.0.0` sobre
la rama `main` y se publicó la primera Release del proyecto.

Esto permite identificar de forma inmutable qué estado del repositorio
corresponde a esa versión.



## Consistencia de datos con volumenes+ docker compose  up
<img width="943" height="446" alt="Captura de pantalla 2026-08-31 a la(s) 12 48 39 p  m" src="https://github.com/user-attachments/assets/0b727274-b597-4c58-8517-3c74c36d2ef9" />
<img width="1512" height="982" alt="Captura de pantalla 2026-08-31 a la(s) 12 50 22 p  m" src="https://github.com/user-attachments/assets/b25eea17-3793-4268-b215-07746fc1f2b1" />
<img width="834" height="305" alt="Captura de pantalla 2026-08-31 a la(s) 12 50 15 p  m" src="https://github.com/user-attachments/assets/2a4c61d1-f5a8-4cdd-b00c-18afe91021d7" />
<img width="1512" height="982" alt="Captura de pantalla 2026-08-31 a la(s) 12 50 47 p  m" src="https://github.com/user-attachments/assets/cbd9e7d9-00f8-4e7e-9fa5-5cafd0b7224e" />

## Packages
<img width="1512" height="982" alt="Captura de pantalla 2026-08-31 a la(s) 1 15 58 p  m" src="https://github.com/user-attachments/assets/6ad187a4-59aa-45c2-b550-e0fad506809e" />
<img width="1512" height="982" alt="Captura de pantalla 2026-08-31 a la(s) 1 16 02 p  m" src="https://github.com/user-attachments/assets/73cf4dff-92ab-4234-b8ea-e292c606d96f" />



## Pipelines 
## Bloqueo
<img width="1512" height="982" alt="Captura de pantalla 2026-09-02 a la(s) 7 57 27 p  m" src="https://github.com/user-attachments/assets/6c267770-88d2-436b-91a0-713b5c5133ba" />
## arreglado
<img width="1320" height="632" alt="Captura de pantalla 2026-09-02 a la(s) 8 06 25 p  m" src="https://github.com/user-attachments/assets/018b33cb-4e98-47c5-85f3-fdf359960bdc" />

##segundo PR donde te pide update
<img width="1104" height="625" alt="Captura de pantalla 2026-09-02 a la(s) 8 14 59 p  m" src="https://github.com/user-attachments/assets/1e9ef9c5-1335-40a2-8897-3c2dde87e381" />





