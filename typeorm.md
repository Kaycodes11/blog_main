Typeorm cascade true then no need save() individually

foreign key's value are nullable by default

JoinColumn() optional for OneToMany/ManyToOne but
mandatory with OneToOne while JoinTable() is mandatory
for ManyToMany relation

By default, eager loading will include the joined
table when using find but disable if using queryBuilder

otherwise, use lazy loading to load what needed
with find methods by using Promise, e.g. Category Entity 




