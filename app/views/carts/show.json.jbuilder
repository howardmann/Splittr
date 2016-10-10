json.(@cart, :id)
json.total number_to_currency(@cart.total)

json.items @cart.items do |item|
  json.id item.id
  json.description item.description
  json.price number_to_currency(item.price)
  json.quantity item.quantity
  json.subtotal number_to_currency(item.subtotal)
end
