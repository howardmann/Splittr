json.id @item.id
json.description @item.description
json.price number_to_currency(@item.price)
json.quantity @item.quantity
json.subtotal number_to_currency(@item.subtotal)
