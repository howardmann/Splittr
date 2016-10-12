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

    # Send Twilio SMS to all debts of the bill. Custom send_sms module saved in config/lib/messenger.rb
    @bill.debts.each do |debt|
      user = debt.user
      user.send_sms(user.mobile,user)
    end

    redirect_to bill_path(@bill)
  end

  def sync

    @bill = Bill.find(params[:newBillState][:id])
    @bill.items.destroy_all

    if params[:newBillState][:items]
      params[:newBillState][:items].each do |item|
        @item = Item.new(:description => item[:description], :price => item[:price], :quantity => item[:quantity])
        @item.bill_id = @bill.id
        @item.save
      end
    end

    params[:newBillState][:debts].each do |debt|
      @debt = Debt.find(debt[:id])
      @debt.items.destroy_all

      if debt[:items]
        debt[:items].each do |item|
          @item = Item.new(:description => item[:description], :price => item[:price], :quantity => item[:quantity])
          @item.debt_id = @debt.id
          @item.save
        end
      end
      @debt.save
    end

    render 'bills/sync.json.jbuilder'
  end



  private
    def bill_params
      params.require(:bill).permit(:location, :date)
    end

    def item_params
      params.require(:item).permit(:description, :quantity, :price, :bill_id, :cart_id)
    end
end
