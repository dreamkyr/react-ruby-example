class API::V1::APIController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, :with => :catch_404

  def catch_404(exception)
    render_error(exception.message, 404)
  end  

  def set_pagination(items,scope)
    @pagination = {
      page: items.current_page, 
      total_pages: items.total_pages,
      count: scope.size
    }
    return @pagination
  end

end