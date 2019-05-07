class AddFeaturedToIncident < ActiveRecord::Migration[5.2]
  def change
    add_column :incidents, :featured, :boolean, default: false, null: false
  end
end
