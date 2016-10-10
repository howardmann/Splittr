class CartsController < ApplicationController
  def show
    @cart = @current_cart
  end

  # Custom item, debt and user sync API
  def sync

    # Clear out old cart. Avoid duplication
    @cart = @current_cart
    @cart.items.destroy_all
    @cart.debts.destroy_all

    # Update all state items and assign to cart. Skip if params empty
    if params[:newCart][:items]
      params[:newCart][:items].each do |item|
        @item = Item.new(:description => item[:description], :price => item[:price], :quantity => item[:quantity])
        @item.cart_id = @cart.id
        @item.save
      end
    end

    # Update all state debts and assign to cart and new/ existing user. Skip if params empty
    if params[:newCart][:debts]
      params[:newCart][:debts].each do |debt|
        @debt = Debt.new
        @debt.cart_id = @cart.id

        @user = User.find_by(:mobile => debt[:mobile])
        if @user.present?
          @debt.user_id = @user.id
        else
          @new_user = User.create(:name => debt[:name], :mobile => debt[:mobile])
          @debt.user_id = @new_user.id
        end
        @debt.save
      end
    end

    render 'carts/sync.json.jbuilder'
  end

  private
    def user_params
      params.require(:user).permit(:name, :mobile)
    end

    def item_params
      params.require(:item).permit(:description, :quantity, :price, :bill_id, :cart_id)
    end
end
