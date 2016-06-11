# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Expense.delete_all;
5.times do |i|
  Expense.create(id: i+1, date: Date.current, amount: i+1, description: "Expense #{i+1}")
end