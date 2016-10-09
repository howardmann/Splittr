class UserSessionController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(:mobile => params[:mobile])
    if @user.present?
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
