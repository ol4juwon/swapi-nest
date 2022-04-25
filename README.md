#  ***SWAPI API V1***
## Language and frameworks
- Nodejs (12.x)
- Nestjs
- Typescript
- Mysql
- Expressjs
- Redis
## Endpoints
- Films [/films]
  1. Get Movies [/][get]
  2.  [/]
    
- Comments [/Comments]
  1. Add Comment [/films/:id/add][post]
  2. Get All Comments [/][get]
    
- Characters [/characters]
  1. Get Characters [/][get][query{sortby,order,filter(gender=male/female)}]

## TASKS
- [x] Films
- [x] Comments
- [x] Characters
- [ ] Cache request with Redis
- [x] Setup Mysql
- [x] Setup Server
- [x] Deploy to Heroku
- [ ] Get Comment Counts
- [ ] Character Query options( Filter by gender, sort by name and height in asc or desc order)


## Links
- [Home](https://swapi-dev.herokuapp.com)
- [Api v1 Base URl](https://swapi-dev.herokuapp.com/api/v1)


## Installation instructions
- Download the code from github (Main branch)
- npm i to install dependencies
- npm run start:dev to  start application

## Environment Variables
- MYSQL_HOST
- MYSQL_USER
- MYSQL_PASS
- MYSQL_DATABASE_NAME
- MYSQL_PORT
- PORT

***HAPPY CODING***
:grin:
:rocket: :rocket: :rocket: :rocket: :rocket: :rocket:
