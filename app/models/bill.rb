class Bill < ActiveRecord::Base
  has_many :debts
  has_many :items

  def total
    self.items.reduce(0){|sum,item| sum + item.subtotal}
  end
end
