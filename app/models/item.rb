# == Schema Information
#
# Table name: items
#
#  id          :integer          not null, primary key
#  description :string
#  price       :decimal(, )
#  quantity    :integer          default(1)
#  cart_id     :integer
#  bill_id     :integer
#  debt_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Item < ActiveRecord::Base
  belongs_to :cart
  belongs_to :bill
  belongs_to :debt

  validates :description, :price, presence: true
  validates :price, :quantity, numericality: {greater_than: 0} 

  def subtotal
    self.price * self.quantity
  end
end
