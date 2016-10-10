class ItemsController < ApplicationController
  def create

    # @item = Item.new(item_params)
    # @item.cart_id = @current_cart.id
    # @item.save
    params[:items].each do |item|
      @item = Item.new(:description => item[:description], :price => item[:price], :quantity => item[:quantity])
      @item.cart_id = @current_cart.id
      @item.save
    end

    render 'carts/create.json.jbuilder'
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy
    redirect_to cart_path(@current_cart)
  end

  def reduce
    # Find item clicked and reduce quantity by 1
    @item = Item.find(params[:id])
    @item.quantity -= 1
    @item.save

    # Find Debt belonging to current_user and this bill
    @debt = Debt.where(:user_id => @current_user.id).where(:bill_id => params[:bill_id]).first

    # Duplicate item and assign to user's debt wit quantity of 1. Increment quantity if item already exists
    if @debt.items.pluck(:description).include?(@item.description)
      item = @debt.items.find_by(:description => @item.description)
      item.quantity += 1
      item.save
    else
      debt_item = @item.dup
      debt_item.id = Item.last.id + 1
      debt_item.quantity = 1
      debt_item.debt = @debt
      # Remove link from bill
      debt_item.bill_id = nil
      debt_item.save
    end

    # Remove item if quantity is zero
    if @item.quantity == 0
      @item.destroy
    end

    # Redirect back to page
    @bill = Bill.find(params[:bill_id])
    redirect_to bill_path(@bill)
  end

  def add
    # Decrease debt item quantity by 1. Destroy if 0
    debt_item = Item.find(params[:id])
    debt_item.quantity -= 1
    debt_item.save

    # Find item in bill with same name and increment by 1
    @bill = Bill.find(params[:bill_id])
    @item = @bill.items.find_by(:description => debt_item.description)

    if @item.present?
      @item.quantity += 1
      @item.save
    else
      bill_item = debt_item.dup
      bill_item.id = Item.last.id + 1
      bill_item.quantity = 1
      bill_item.bill = @bill
      bill_item.debt_id = nil
      bill_item.save
    end

    if debt_item.quantity == 0
      debt_item.destroy
    end

    redirect_to bill_path(@bill)
  end

  private
    def item_params
      params.require(:item).permit(:description, :quantity, :price, :bill_id, :cart_id)
    end

end
