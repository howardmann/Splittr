class CreateDebts < ActiveRecord::Migration
  def change
    create_table :debts do |t|
      t.boolean :paid, default: false
      t.string :status
      t.integer :cart_id
      t.integer :user_id
      t.integer :bill_id

      t.timestamps null: false
    end
  end
end
