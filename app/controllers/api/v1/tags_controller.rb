class API::V1::TagsController < API::V1::APIController

  def index
    @scope = Incident.all_tags
    if params[:query].present?
      result = []
      @scope.each do |tag|
        if tag.start_with?(params[:query])
          result << tag
        end
      end
      @scope = result
    end
    @tags = Kaminari.paginate_array(@scope, total_count: @scope.count).page(params[:page]).per(10)
    set_pagination(@tags, @scope)
  end

  def suggested
    min_rating = params[:min_rating]
    min_rating ||= 1

    max_rating = params[:max_rating]
    max_rating ||= 5
    
    
    @scope = SuggestedTag.between_rating(min_rating, max_rating)
    @tags = @scope.page(params[:page]).per(4)
    set_pagination(@tags, @scope)
  end

end
