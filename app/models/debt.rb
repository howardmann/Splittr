class Debt < ActiveRecord::Base
  belongs_to :user
  belongs_to :bill
  belongs_to :cart
  has_many :items

  def total
    self.items.reduce(0){|sum,item| sum + item.subtotal}
  end

end
