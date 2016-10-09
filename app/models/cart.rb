class Cart < ActiveRecord::Base
  has_many :items
  has_many :debts
end
