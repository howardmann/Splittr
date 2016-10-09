class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :description
      t.decimal :price
      t.integer :quantity, default: 1
      t.integer :cart_id
      t.integer :bill_id
      t.integer :debt_id

      t.timestamps null: false
    end
  end
end
