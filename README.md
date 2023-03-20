<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Api de logeo con JWT

1. Clonar proyecto
2. Instalar dependencias

```
npm install
```

3. Crear arhcivo `.env` y cargar con valor las variales de entorno definidas en el archivo `.env.template`

4. Ejecutar comando para levantar la base de datos en postgres:

```
docker-compose up -d
```

4. Arrancar aplicacion en modo desarrollo:

```
npm run start:dev
```

# Endpoints para probar

1. Crear user

```
method: POST
ULR: http://localhost:3000/api/users
body: {
  "username": "user",
  "password": "password",
  "roles": ["admin"]
}

```

2. Get all users

```
method: GET
ULR: http://localhost:3000/api/users
```

3. Login

```
method: POST
URL: http://localhost:3000/api/auth/login
body: {
  "username": "USER",
  "password": "PASS"
}
```

4. Get profile

```
method: GET
URL: http://localhost:3000/api/auth/profile
```

- Nota: Colocar el token obtenido en el parametro `Bearer`

# Stack utilizado

- NestJs
- DB Postgres
- NodeJs

# Herramientas

- Docker
