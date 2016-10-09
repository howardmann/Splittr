class BillsController < ApplicationController
  def index
    @bills = Bill.all
  end

  def new
    @bill = Bill.new
  end

  def show
    @bill = Bill.find(params[:id])
    @authorized_user = true if @bill.debts.pluck(:user_id).include?(@current_user.id)
    @ordered_items = @bill.items.all.order('created_at ASC')
  end

  def create
    @bill = Bill.new(bill_params)

    @current_cart.items.each do |item|
      @bill.items << item
      item.cart_id = nil
    end

    @current_cart.debts.each do |debt|
      @bill.debts << debt
      debt.cart_id = nil
    end

    @bill.save

    # Find debt from radio button tag and set status as true
    @debt = Debt.find(params[:debt_id]).first
    @debt.paid = true
    @debt.save

    # Default login the user whose paid status is true
    session[:user_id] = @debt.user.id

    redirect_to bill_path(@bill)
  end

  private
    def bill_params
      params.require(:bill).permit(:location, :date)
    end
end
