class Incidents::BuildController < ApplicationController
  include Wicked::Wizard

  steps :date, :what, :officer, :rate, :photos

  def show
    set_incident
    render_wizard
  end

  def update
    set_incident
    @incident.update_attributes(incident_params)
    render_wizard @incident
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_incident
      @incident = Incident.friendly.find(params[:incident_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def incident_params
      params.require(:incident).permit(:text, :rating, :tags_list, :date, :date_date, :date_time, :location, :category, :officer_name, :officer_badge_number, :officer_race, :officer_gender)
    end
end
