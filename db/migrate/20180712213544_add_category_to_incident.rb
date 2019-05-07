class AddCategoryToIncident < ActiveRecord::Migration[5.2]
  def change
    add_column :incidents, :category, :string
  end
end
