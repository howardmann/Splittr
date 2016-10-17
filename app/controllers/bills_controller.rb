class BillsController < ApplicationController
  def new
    @bill = Bill.new
  end

  def show
    @bill = Bill.find(params[:id])
  end

  def create
    # Instantiate a new bill
    @bill = Bill.new(bill_params)

    # Transfer items and debts from cart to bill, remembering to remove cart id from each debt and item after the transfer
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
    # Find Bill from params sent by ajax post request and clear out all items
    @bill = Bill.find(params[:newBillState][:id])
    @bill.items.destroy_all

    # If ajax post request has any items create new items and append them to the bill
    if params[:newBillState][:items]
      params[:newBillState][:items].each do |item|
        @item = Item.create(:description => item[:description], :price => item[:price], :quantity => item[:quantity])
        @bill.items << @item
      end
    end

    # Iterate through each debt from the ajax post and initially destroy all items before createing new items and appending to the relevant debt
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

    # Respond with json response per show
    render template: 'bills/show.json.jbuilder'
  end

  private
    def bill_params
      params.require(:bill).permit(:location, :date)
    end
end
