class AddCostField < ActiveRecord::Migration[7.2]
  def change
    add_column :items, :cost, :decimal
  end
end
