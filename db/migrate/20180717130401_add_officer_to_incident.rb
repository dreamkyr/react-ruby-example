class AddOfficerToIncident < ActiveRecord::Migration[5.2]
  def change
    add_column :incidents, :officer_name, :string
    add_column :incidents, :officer_badge_number, :string
    add_column :incidents, :officer_race, :string
    add_column :incidents, :officer_gender, :string
  end
end
