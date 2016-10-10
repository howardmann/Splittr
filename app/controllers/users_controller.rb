class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    # # Create new Debt linked to current_cart and new/ existing user
    # @debt = Debt.new
    # @debt.cart_id = @current_cart.id
    #
    # @user = User.find_by(:mobile => params[:user][:mobile])
    # if @user.present?
    #   @debt.user_id = @user.id
    # else
    #   @new_user = User.create(user_params)
    #   @debt.user_id = @new_user.id
    # end
    #
    # @debt.save

    # #########
    # @current_cart.debts.destroy_all
    #
    #
    # params[:debts].each do |debt|
    #   @debt = Debt.new
    #   @debt.cart_id = @current_cart.id
    #
    #   @user = User.find_by(:mobile => debt[:mobile])
    #   if @user.present?
    #     @debt.user_id = @user.id
    #   else
    #     @new_user = User.create(:name => debt[:name], :mobile => debt[:mobile])
    #     @debt.user_id = @new_user.id
    #   end
    #   @debt.save
    # end
    #
    # render 'users/create.json.jbuilder'
  end

  private
    def user_params
      params.require(:user).permit(:name, :mobile)
    end
end
