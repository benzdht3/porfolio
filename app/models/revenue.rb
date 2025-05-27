class Revenue < ApplicationRecord
  belongs_to :item

  def item_name
    item.name
  end

  def total_price
    item.price * quantity
  end
end
