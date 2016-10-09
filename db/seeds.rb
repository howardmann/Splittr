# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Bill.destroy_all
Cart.destroy_all
Item.destroy_all
User.destroy_all
Debt.destroy_all

bill = Bill.create(:location => "Sydney", :date=>"01-01-2016")
laptop = Item.create(:description => "laptop", :price => 20)
computer = Item.create(:description => "computer", :price => 30)
bill.items << laptop << computer

jackDebt = Debt.create
jackUser = User.create(:name => "jack", :mobile => 1234)
bill.debts << jackDebt
jackUser.debts << jackDebt

janeDebt = Debt.create
janeUser = User.create(:name => "jane", :mobile => 4321)
bill.debts << janeDebt
janeUser.debts << janeDebt



puts "User count: #{User.all.length} #{User.all.pluck(:name)}"
puts "Item count: #{Item.all.length} #{Item.all.pluck(:description)}"
puts "Bill count: #{Bill.all.length} #{Bill.all.pluck(:location)}"
puts "Debt count: #{Debt.all.length}"

puts "bill items: #{bill.items.pluck(:description)}"
puts "#{jackUser.name} has a debt at location #{jackDebt.bill.location}"
puts "#{janeUser.name} has a debt at location #{janeDebt.bill.location}"
