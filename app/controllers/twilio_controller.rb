class TwilioController < ApplicationController

  def index
    @user = User.new
  end

  def send_text
    @user = User.create(user_params)
    @user.send_sms(@user.mobile, @user)
    redirect_to twilio_path
  end

  private
    def user_params
      params.require(:user).permit(:name, :mobile)
    end
end
