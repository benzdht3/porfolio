class RevenueController < ApplicationController
  def index
    @staffs = User.where(admin: false)
    if revenue_params.present?
      date_time_from = "#{revenue_params['from(3i)']}/#{revenue_params['from(2i)']}/#{revenue_params['from(1i)']} #{revenue_params['from(4i)']}:#{revenue_params['from(5i)']}:59}"
      date_time_to = "#{revenue_params['to(3i)']}/#{revenue_params['to(2i)']}/#{revenue_params['to(1i)']} #{revenue_params['to(4i)']}:#{revenue_params['to(5i)']}:00"
      created_at = Time.zone.parse(date_time_from)
      created_to = Time.zone.parse(date_time_to)
      @revenues = Revenue.where(created_at: created_at..created_to)
      @from_date = created_at
      @to_date = created_to
      @user_id = revenue_params['user_id']
    else
      @revenues = Revenue.where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day)
      @from_date = Time.zone.now.beginning_of_day
      @to_date = Time.zone.now.end_of_day
    end
    @total_revenue = @revenues.map(&:total_price).sum
  end

  private

  def revenue_params
    params[:revenue]
  end
end
