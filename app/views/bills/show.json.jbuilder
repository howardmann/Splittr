json.(@bill, :id)
json.location @bill.location
json.date @bill.date
json.total @bill.total

json.items @bill.items do |item|
  json.id item.id
  json.description item.description
  json.price item.price
  json.quantity item.quantity
  json.subtotal item.subtotal
end

json.debts_owed @bill.debts_owed do |debt|
  json.id debt.id
  json.user_id debt.user.id
  json.name debt.user.name
  json.mobile debt.user.mobile
  json.paid debt.paid
end

json.debts_owing @bill.debts_owing do |debt|
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
