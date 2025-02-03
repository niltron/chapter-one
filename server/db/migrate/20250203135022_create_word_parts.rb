class CreateWordParts < ActiveRecord::Migration[8.0]
  def change
    create_table :word_parts do |t|
      t.belongs_to :phonics_level, null: false, foreign_key: true
      t.string :label
      t.integer :position

      t.timestamps
    end
  end
end
