class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  include SessionsHelper

  helper_method :admin?

  def admin?
    current_user.present? && current_user.admin?
  end
end
