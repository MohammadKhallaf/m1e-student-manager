# 7 sept session
- migrate -> productManager
- migrate -> product CRUD
- validation -> product CRUD

## Middleware 
- order matters
- make changes (request | response)
- inline within the route handler -> chain
- Types:
  - Application-level (auth- logger)
  - Router-level (split)
  - Error-handling
  - Built-in (json)
  - Third-party (cors - helmet)

### How to use 
- ordinany: `(request,response,next)=>{}`
- error: `(error,request,response,next)=>{}`
- inline: `app.METHOD('url',middlewareFn,middlewareFn2,...,routeHandler)`

## How to migrate to express router middleware
1- split to separate routes file
2- use router middleware (instead of app.METHOD)
3- export the router
4- import the router in the main file (app.js)
5- use the router using app.use("url",customRoutes)

## uses
- parsing json -> body (JS Object)
- app.METHOD

Request-Response cycle

[client] --> [Middleware] --(next())-> [Route(app.METHOD)] ---> ....... -> [Response]
                          |----------------------------------------------> [Response]


## Environment variable





----------------
- prefer async functions --> 
# writeFile ( path , data )

- add id

# id -> uuid 

# App Architecture


# 
request -|reading|-|validate|---------------------> db
- allowed source
- shape --> schema
- business logic --> validation of values