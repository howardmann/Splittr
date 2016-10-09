class DebtsController < ApplicationController
  def destroy
    @debt = Debt.find(params[:id])
    @debt.destroy
    redirect_to cart_path(@current_cart) 
  end
end
