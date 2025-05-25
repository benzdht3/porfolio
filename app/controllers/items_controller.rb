class ItemsController < ApplicationController
  def index
    @items = Item.where(category: params[:category])
  end

  def create
    @item = Item.new(item_params)
    if @item.save
      @item.image.attach(item_params[:image])

      redirect_to items_path(category: @item.category)
    else
      redirect_to root_path, alert: 'Thêm hàng thất bại'
    end
  end

  def update
    @item = Item.find(params[:id])
    if @item.update(item_edit_params)
      @item.image.attach(item_edit_params[:image]) if item_edit_params[:image].present?
      redirect_to root_path
    else
      redirect_to root_path, alert: 'Cập nhật hàng thất bại'
    end
  end

  def destroy
    @item = Item.find(params[:id])
    @item.image.purge if @item.image.attached?
    @item.destroy!

    redirect_to root_path
  end

  def update_quantity
    @item = Item.find(params[:id])
    @item.update(quantity: @item.quantity + params[:quantity].to_i)

    redirect_to items_path(category: @item.category)
  end

  def ajax_open_add
    render partial: 'items/add_item_modal', locals: { category: params[:category] }, layout: false
  end

  def ajax_open_edit
    @item = Item.find(params[:id])

    render partial: 'items/edit_item_modal', locals: { item: @item }
  end

  private

  def item_params
    @item_params ||= params.require(:item).permit(:name, :cost, :quantity, :image, :price, :category)
    @item_params[:cost] = (@item_params[:cost].to_i/@item_params[:quantity].to_i).to_f
    @item_params[:price] = @item_params[:price].to_i
    @item_params[:quantity] = @item_params[:quantity].to_i

    @item_params
  end

  def item_edit_params
    @item_edit_params ||= params.require(:item).permit(:name, :cost, :image, :price)

    @item_edit_params
  end
end
