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

require 'test_helper'

class ItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
