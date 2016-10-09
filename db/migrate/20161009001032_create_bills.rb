class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.string :location
      t.string :date
      t.string :status

      t.timestamps null: false
    end
  end
end
