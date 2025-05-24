class ItemsController < ApplicationController
  def index
    @items = Item.where(category: params[:category])
  end

  def create
    @item = Item.new(item_params)
    if @item.save
      @item.image.attach(item_params[:image])
      redirect_to root_path
    else
      redirect_to root_path, alert: 'Thêm hàng thất bại'
    end
  end

  private

  def item_params
    @item_params ||= params.require(:item).permit(:name, :cost, :quantity, :image, :price)
    @item_params[:cost] = (@item_params[:cost].to_i/@item_params[:quantity].to_i).to_f
    @item_params[:price] = @item_params[:price].to_i
    @item_params[:quantity] = @item_params[:quantity].to_i
    @item_params[:category] = params[:category] || 'drink'

    @item_params
  end
end
