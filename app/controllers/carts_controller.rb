class CartsController < ApplicationController
  def show
    @item = Item.new
    @user = User.new
    @cart = @current_cart
  end
end
