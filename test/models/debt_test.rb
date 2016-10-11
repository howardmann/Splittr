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

require 'test_helper'

class DebtTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
