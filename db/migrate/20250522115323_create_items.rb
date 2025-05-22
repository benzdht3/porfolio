class CreateItems < ActiveRecord::Migration[7.2]
  def change
    create_table :items do |t|
      t.timestamps
      t.string :name
      t.string :image_url
      t.decimal :price, precision: 10, scale: 0
      t.string :category
      t.integer :quantity
    end
  end
end
