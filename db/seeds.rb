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

bill = Bill.create(:location => "Chat Thai", :date=>"10-10-2016")
snapper = Item.create(:description => "snapper", :price => 20, :quantity => 1)
larbgai = Item.create(:description => "larb gai", :price => 15, :quantity => 1)
springroll = Item.create(:description => "spring roll", :price => 4, :quantity => 3)
curry = Item.create(:description => "massaman curry", :price => 18, :quantity => 1)
beer = Item.create(:description => "beer", :price => 5.50, :quantity => 8)
rice = Item.create(:description => "rice", :price => 3, :quantity => 4)

bill.items << snapper << larbgai << springroll << curry << beer << rice

jackDebt = Debt.create(:paid => true)
jackUser = User.create(:name => "Jack", :mobile => '0413038990')
bill.debts << jackDebt
jackUser.debts << jackDebt

janeDebt = Debt.create
janeUser = User.create(:name => "Jane", :mobile => '0429309228')
bill.debts << janeDebt
janeUser.debts << janeDebt

hollyDebt = Debt.create
hollyUser = User.create(:name => "Holly", :mobile => '0423829110')
bill.debts << hollyDebt
hollyUser.debts << hollyDebt

howieDebt = Debt.create
howieUser = User.create(:name => "Howie", :mobile => '0412038990')
bill.debts << howieDebt
howieUser.debts << howieDebt



puts "User count: #{User.all.length} #{User.all.pluck(:name)} #{User.all.pluck(:mobile)}"
puts "Item count: #{Item.all.length} #{Item.all.pluck(:description)}"
puts "Bill count: #{Bill.all.length} #{Bill.all.pluck(:location)}"
puts "Debt count: #{Debt.all.length}"

puts "bill items: #{bill.items.pluck(:description)}"
puts "#{jackUser.name} has a debt at location #{jackDebt.bill.location}"
puts "#{janeUser.name} has a debt at location #{janeDebt.bill.location}"
