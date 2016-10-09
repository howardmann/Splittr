class Item < ActiveRecord::Base
  belongs_to :cart
  belongs_to :bill
  belongs_to :debt

  def subtotal
    self.price * self.quantity 
  end
end
