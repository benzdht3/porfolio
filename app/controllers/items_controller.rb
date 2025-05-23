class ItemsController < ApplicationController
  def index
    @items = Item.where(category: params[:category])
  end

  def show
    @item = Item.find(params[:id])
  end
end
