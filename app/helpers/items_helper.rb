module ItemsHelper
  def format_items(item)
    "x#{pluralize(item.quantity, item.description)} #{number_to_currency(item.price)} each | Subtotal: #{number_to_currency(item.subtotal)}"
  end

end
