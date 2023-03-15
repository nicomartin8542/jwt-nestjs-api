<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Api de logeo con JWT

1. Clonar proyecto
2. Instalar dependencias

```
npm install
```

3. Cargar las con valor las variales de entorno definidas en el archivo `.env`

4. Arrancar aplicacion en modo desarrollo:

```
npm run start:dev
```

# Endpoints para probar

1. Login

```
http://localhost:3000/api/auth/login
```

- Body

```
{
  "username": "maria",
  "password": "guess"
}
```

2. Get profile: Para este endpint colocar en el Bearer el token JWT previamente obtenido con el login

```
http://localhost:3000/api/profile
```
