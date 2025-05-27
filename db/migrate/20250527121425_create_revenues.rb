class CreateRevenues < ActiveRecord::Migration[7.2]
  def change
    create_table :revenues do |t|
      t.references :user, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true
      t.integer :quantity
      t.decimal :price
      t.decimal :cost
      t.decimal :profit
      t.timestamps
    end
  end
end
