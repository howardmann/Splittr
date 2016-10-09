class Debt < ActiveRecord::Base
  belongs_to :user
  belongs_to :bill
  belongs_to :cart
  has_many :items
end
