class AddTagsToIncident < ActiveRecord::Migration[5.2]
  def change
  	add_column :incidents, :tags, :string, array: true, default: []
    add_index  :incidents, :tags, using: 'gin'  
  end
end
