# == Schema Information
#
# Table name: bills
#
#  id         :integer          not null, primary key
#  location   :string
#  date       :string
#  status     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Bill < ActiveRecord::Base
  has_many :debts, dependent: :destroy
  has_many :items, dependent: :destroy

  def total
    self.items.reduce(0){|sum,item| sum + item.subtotal}
  end

  def debts_owed
    self.debts.where(:paid => true)
  end

  def debts_owing
    self.debts.where(:paid => false)
  end

  def debts_paid_ordered
    self.debts.order('paid DESC')
  end
end
