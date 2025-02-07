class WordPart < ApplicationRecord
  belongs_to :phonics_level

  validates :label, presence: true

  enum :status, { mastered: "mastered", needs_work: "needs_work" }, validate: { allow_nil: true }
end
