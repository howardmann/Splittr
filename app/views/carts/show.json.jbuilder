json.(@cart, :id)
json.total @cart.total

json.items @cart.items do |item|
  json.id item.id
  json.description item.description
  json.price item.price
  json.quantity item.quantity
  json.subtotal item.subtotal
end
