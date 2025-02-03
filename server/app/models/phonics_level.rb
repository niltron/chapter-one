class PhonicsLevel < ApplicationRecord
  validates :level_number, numericality: { greater_than_or_equal_to: 1 }, presence: true, uniqueness: true

  has_many :word_parts
end
