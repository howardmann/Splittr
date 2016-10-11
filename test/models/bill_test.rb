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

require 'test_helper'

class BillTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
