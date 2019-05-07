class CreateIncidents < ActiveRecord::Migration[5.2]
  def change
    create_table :incidents do |t|
      t.text :text
      t.string :slug, null: false
      t.integer :rating, null: false, default: 0

      t.timestamps
    end

    add_index :incidents, :slug, unique: true
  end
end
