## Castia challenge docs

## Setup

Como variables de entorno se estan utilizando

```env
PORT=
GITHUB_URL=
```

## Instalación y ejecución

```bash
git clone https://github.com/jvaldesgonzalez/castia-challenge
cd castia-challenge

yarn install #instalar las dependencias
yarn start:dev  #ejecutar en modo develop
```

## Testing

En el challenge se crearon diferentes tests unitaros por cada capa, son los archivos termindos en .spec.ts, para ejecutar los tests simplemente corra:

```bash
yarn test
```

## Documentación

Se utilizó swagger para documentar el api, para visualizar la UI de swagger vaya a http://<DOMAIN>:<PORT>/api-docs

## Despliegue en Heroku

https://castia.herokuapp.com/api-docs/
