Typeorm cascade true then no need save() individually

foreign key's value are nullable by default

JoinColumn() optional for OneToMany/ManyToOne but
mandatory with OneToOne while JoinTable() is mandatory
for ManyToMany relation

By default, eager loading will include the joined
table when using find but disable if using queryBuilder

otherwise, use lazy loading to load what needed
with find methods by using Promise, e.g. Category Entity


## These are applied on global (main.ts), controller, method, param

## To apply on module level, use built-in APP_GUARD, APP_INTERCEPTORS, APP_PIPE, APP_FILTER etc.
providers: [{
provide: APP_GUARD,
useClass: RolesGuard [after all this is a class]
}]

#### Guards

#### Interceptors

#### Middlewares

#### Custom Decorators

#### Exception Filters : Error Handler

#### Dynamic Modules

#### Transaction : Migrations : Query Runner : Caching

#### SELECT : INSERT : UPDATE : DELETE WITH QUERY BUILDER

#### [TypeORM READ](https://www.example.com/my%20great%20page)