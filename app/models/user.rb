class User < ActiveRecord::Base
  has_many :debts
  has_many :bills, :through => :debts

  validates :mobile, uniqueness: true

  
end
