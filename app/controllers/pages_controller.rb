class PagesController < ApplicationController
  def index
    @incidents = Incident.featured.by_recent.limit(3)
  end

  def about
  end

  def contact
  end
end
