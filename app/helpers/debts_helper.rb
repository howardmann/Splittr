module DebtsHelper
  def format_user(debt)
    "#{debt.user.name} (Mob: #{debt.user.mobile})"
  end
end
