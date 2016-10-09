class ItemsController < ApplicationController
  def create
    @item = Item.new(item_params)
    @item.cart_id = @current_cart.id
    @item.save

    redirect_to cart_path(@current_cart)
  end

  def destroy
  end


  private
    def item_params
      params.require(:item).permit(:description, :quantity, :price)
    end

end
