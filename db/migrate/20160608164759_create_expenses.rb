class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.date :date
      t.text :description
      t.decimal :amount, :precision => 12, :scale => 2
      t.timestamps null: false
    end
  end
end