class Bill < ActiveRecord::Base
  has_many :debts
  has_many :items

  def total
    self.items.reduce(0){|sum,item| sum + item.subtotal}
  end

  def debts_owed
    self.debts.where(:paid => true)
  end

  def debts_owing
    self.debts.where(:paid => false)
  end
end
