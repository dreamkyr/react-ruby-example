class CreateSuggestedTags < ActiveRecord::Migration[5.2]
  def change
    create_table :suggested_tags do |t|
      t.string :name, null: false
      t.integer :min_rating, null: false
      t.integer :max_rating, null: false

      t.timestamps
    end
    add_index :suggested_tags, :min_rating
    add_index :suggested_tags, :max_rating
  end
end
