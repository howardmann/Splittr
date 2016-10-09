class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :current_cart, :fetch_user

  private
    # Creates a new cart for each new session visit
    def current_cart
      # Find the cart if session exists otherwise set session as nil
      @current_cart = Cart.find_by(:id => session[:cart_id]) if session[:cart_id]
      session[:cart_id] = nil unless @current_cart.present?

      # If cart session is nil create a new cart and track
      if session[:cart_id] == nil
        @current_cart = Cart.create
        session[:cart_id] = @current_cart.id
      end
    end

    # Track current_user logged in throughout app
    def fetch_user
      @current_user = User.find_by(:id => session[:user_id]) if session[:user_id]

      session[:user_id] = nil unless @current_user.present?
    end
end
