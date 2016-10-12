# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  name       :string
#  mobile     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ActiveRecord::Base
  include Messenger

  has_many :debts
  has_many :bills, :through => :debts

  validates :mobile, uniqueness: true
  validates :name, presence: true

  before_validation :remove_whitespace

  # Include custom Messenger module which stores Twilio code. Module saved in config/lib folder but lib modules must be also required in config/application.rb


  private
    def remove_whitespace
      # binding.pry
      self.mobile.gsub!("/\s/","")
      self.name.gsub!("/\s\s+/"," ")
    end

end
