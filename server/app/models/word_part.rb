class WordPart < ApplicationRecord
  belongs_to :phonics_level

  validates :label, presence: true
end
