json.(@cart, :id)
json.total @cart.total

json.items @cart.items do |item|
  json.id item.id
  json.description item.description
  json.price item.price
  json.quantity item.quantity
  json.subtotal item.subtotal
end

json.debts @cart.debts do |debt|
  json.id debt.id
  json.user_id debt.user.id
  json.name debt.user.name
  json.mobile debt.user.mobile
end
