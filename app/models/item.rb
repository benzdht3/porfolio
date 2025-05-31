class Item < ApplicationRecord
  has_one_attached :image
  has_many :revenues, dependent: :destroy
end
