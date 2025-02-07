# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
level_data = {
  1 => %w[p n a t c f s],
  2 => %w[h k it b g m w et],
  3 => %w[l d ot r v j y ut],
  4 => %w[wp ip op up ad ed id od ud am em im om um an en in un],
  5 => %w[ade ide ode ude ame ime ome bl cl fl gl],
  6 => %w[any all as away boy could find girl good just]
}

level_data.each do |level, words|
  level = PhonicsLevel.find_or_create_by(level_number: level)

  words.each do |word|
    word_part = WordPart.find_or_initialize_by(label: word)
    word_part.update!(phonics_level: level)
  end
end
