# Task Manager

## Descripción

Este proyecto es un **gestor de tareas** que permite **crear, editar, eliminar y listar tareas** utilizando un backend en **Symfony (PHP)** y un frontend en **HTML, CSS y JavaScript**.

## Tecnologías utilizadas

- **Backend**: PHP con Symfony
- **Base de datos**: MySQL
- **Frontend**: HTML, CSS y JavaScript

## Estructura del Repositorio

```
Task-Manager/
├── Desafio-Backend/
│   ├── src/
│   │   ├── Controller/
│   │   │   ├── TaskController.php
│   │   ├── Entity/
│   │   │   ├── Task.php
│   │   ├── Repository/
│   │   │   ├── TaskRepository.php
│   │   ├── migrations/
│   ├── config/
│   ├── public/
│   │   ├── index.php
│   ├── templates/
│   │   ├── task/
│   │   │   ├── index.html.twig
│   ├── database_setup.sql
│   ├── composer.json
│   ├── .env.example
│
├── Desafio-Frontend/
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│
├── README.md
```

## Configuración y Ejecución

### 1. Configuración del Backend (Symfony)

#### Requisitos previos

- Tener **PHP 8+** instalado.
- Tener **Composer** instalado.
- Tener **MySQL** instalado.

#### Instalación

Ejecutar los siguientes comandos:

```sh
cd Desafio-Backend
composer install
cp .env.example .env
```

🔹 **Modificar el archivo `.env.example`**  
Antes de continuar, abre `.env` y edita la línea de conexión a la base de datos con tus credenciales de MySQL:

```
DATABASE_URL="mysql://usuario:contraseña@127.0.0.1:3306/nombre_base_de_datos"
```

Luego, ejecuta:

```sh
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate --no-interaction
php bin/console cache:clear
symfony server:start
```

#### **Cargar datos iniciales en MySQL**
Si el archivo `database_setup.sql` está incluido(Lo cual debería, me aseguré de ello), usa este comando:

```sh
mysql -u tu_usuario -p < database_setup.sql
```

### 2. Configuración del Frontend

#### Requisitos previos

- IMPORTANTE Se recomienda **no usar Live Server**, ya que puede causar recargas constantes en la página. (Estuve peleando con esto como 1 hora entera sin saber el motivo y era el Live server, cualquier otro metodo debería funcionar)
- Se puede utilizar cualquier otro servidor local o simplemente abrir el `index.html` directamente en el navegador. (Lo más recomendable es simplemente abrir Index.html desde la misma carpeta una vez se ejecuta el comando symfony server:start)



## Nota sobre los Endpoints

El backend proporciona una API RESTful que sigue los siguientes endpoints:

## API Endpoints

| Método   | Endpoint              | Descripción                        |
| -------- | --------------------- | ---------------------------------- |
| `GET`    | `/task`               | Obtiene todas las tareas           |
| `GET`    | `/task?completed=1`   | Filtra solo las tareas completadas |
| `GET`    | `/task?search=nombre` | Busca tareas por nombre            |
| `POST`   | `/task/new`           | Crea una nueva tarea               |
| `PUT`    | `/task/{id}/edit`     | Edita una tarea existente          |
| `DELETE` | `/task/{id}`          | Elimina una tarea                  |

## Solución de Problemas

- **Live Server causa recargas constantes**: Se recomienda **no usar Live Server** para ejecutar el frontend. En su lugar, abre `index.html` directamente en el navegador o usa otro servidor local.
- **Error CORS**: Si ves un error de CORS en la consola, asegúrate de haber instalado `nelmio/cors-bundle`:
  ```sh
  composer require nelmio/cors-bundle
  ```
- **Error 405 (Method Not Allowed)**: Confirma que estás enviando el método correcto (`POST`, `PUT`, `DELETE`).
- **Error de conexión a la base de datos**: Verifica que el archivo `.env` tenga las credenciales correctas. Si modificas el usuario o contraseña de MySQL, actualízalos en `.env.example` y sigue los pasos de configuración.

## Licencia

Este proyecto es de uso libre para propósitos educativos y de práctica.