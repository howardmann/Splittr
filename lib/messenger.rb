module Messenger

  def send_sms(number, user)
    # Hide in ENV
    account_sid = ENV["TWILIO_ACCOUNT_SID"]
    auth_token = ENV["TWILIO_AUTH_TOKEN"]

    @client = Twilio::REST::Client.new account_sid, auth_token

    number[0] = ""
    msg = "Welcome #{user.name} to Splittr, you have been added to a new bill. Visit the link to check your bills https://bill-splittr.herokuapp.com/login"

    @message = @client.account.messages.create(
      from: "61476856534",
      to: number,
      body: msg
    )
  end

end
