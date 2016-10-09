class Bill < ActiveRecord::Base
  has_many :debts
  has_many :items
end
