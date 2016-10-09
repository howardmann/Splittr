class CartsController < ApplicationController
  def show
    @item = Item.new
    @user = User.new
  end
end
