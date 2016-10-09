class Cart < ActiveRecord::Base
  has_many :items
  has_many :debts

  def total
    self.items.reduce(0){|sum,item| sum + item.subtotal}
  end
end
