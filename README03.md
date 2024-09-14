# Mongo Migration

- NoSQl
- BSON -> Binary JSON -> JSON like

## How to work with mongo

-> connect
-> define a schema
-> Model

-> operation -> model <--> schema


-> disconnect


-> mongoose -> ORM | ODM -> Object **Relational** Mapper | Object **Data** Mapper

----URI---


`[monogdb]//localhost:24017/[database_name]`
`[monogdb]//username:password@.../[database_name]`
## Steps:
1- install mongoose `npm i mongoose`
2- connect `mongoose.connect(uri)`
3- listen to connection events (once | on)

## MVC 
Controller <--> Route

## Mongo Queries
- Create
  - `new Product({...data}) ;await product.save()`
  - `await Product.create({...data})`
- Read
  - all -> `await Product.find()`
  - one -> `await Product.findById(req.params.id).exec()`
  - filter -> **task**
- Update -> **task**
- Delete -> **task**