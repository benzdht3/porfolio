module ApplicationHelper
  def page_items?
    controller_name == 'items' && action_name == 'index'
  end
end
