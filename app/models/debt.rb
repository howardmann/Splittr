# == Schema Information
#
# Table name: debts
#
#  id         :integer          not null, primary key
#  paid       :boolean          default(FALSE)
#  status     :string
#  cart_id    :integer
#  user_id    :integer
#  bill_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Debt < ActiveRecord::Base
  belongs_to :user
  belongs_to :bill
  belongs_to :cart
  has_many :items

  def total
    self.items.reduce(0){|sum,item| sum + item.subtotal}
  end

end
