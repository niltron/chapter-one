class CreatePhonicsLevels < ActiveRecord::Migration[8.0]
  def change
    create_table :phonics_levels do |t|
      t.integer :level_number, index: { unique: true },  null: false
      t.timestamps
    end
  end
end
