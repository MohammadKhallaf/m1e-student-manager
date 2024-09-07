# 7 sept session
- migrate -> productManager
- migrate -> product CRUD
- validation -> product CRUD


## Middleware 
- order matters
- make changes (request | response)
- inline within the route handler -> chain
- Types:
  - Application-level
  - Router-level
  - Error-handling
  - Built-in
  - Third-party (cors - helmet)
### How to use 
- ordinany: `(request,response,next)=>{}`
- error: `(error,request,response,next)=>{}`
- inline: `app.METHOD('url',middlewareFn,middlewareFn2,...,routeHandler)`

## uses
- parsing json -> body (JS Object)
- app.METHOD

Request-Response cycle

[client] --> [Middleware] --(next())-> [Route(app.METHOD)] ---> ....... -> [Response]
                          |----------------------------------------------> [Response]

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