# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_02_03_135022) do
  create_table "phonics_levels", force: :cascade do |t|
    t.integer "level_number", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["level_number"], name: "index_phonics_levels_on_level_number", unique: true
  end

  create_table "word_parts", force: :cascade do |t|
    t.integer "phonics_level_id", null: false
    t.string "label"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["phonics_level_id"], name: "index_word_parts_on_phonics_level_id"
  end

  add_foreign_key "word_parts", "phonics_levels"
end
