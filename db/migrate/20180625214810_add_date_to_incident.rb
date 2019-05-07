class AddDateToIncident < ActiveRecord::Migration[5.2]
  def change
    add_column :incidents, :date, :datetime
    add_index :incidents, :date
  end
end
