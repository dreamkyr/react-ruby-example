class AddLocationToIncident < ActiveRecord::Migration[5.2]
  def change
    add_column :incidents, :location, :string
  end
end
