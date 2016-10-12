json.(@bill, :id)
json.location @bill.location
json.date @bill.date
json.total @bill.total
json.current_user_id @current_user.id
json.paid_user_name @bill.debts_paid_ordered[0].user.name

json.items @bill.items do |item|
  json.id item.id
  json.description item.description
  json.price item.price
  json.quantity item.quantity
  json.subtotal item.subtotal
end

json.debts @bill.debts_paid_ordered do |debt|
  json.id debt.id
  json.user_id debt.user.id
  json.name debt.user.name
  json.mobile debt.user.mobile
  json.paid debt.paid

  json.items debt.items do |item|
    json.id item.id
    json.description item.description
    json.price item.price
    json.quantity item.quantity
    json.subtotal item.subtotal
  end

end
