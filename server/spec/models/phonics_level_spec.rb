require 'rails_helper'

RSpec.describe PhonicsLevel, type: :model do
  it { is_expected.to validate_presence_of(:level_number) }
  it { is_expected.to validate_numericality_of(:level_number).is_greater_than_or_equal_to(1) }

  it "requires a unique level_number" do
    PhonicsLevel.create(level_number: 1)

    new_level = PhonicsLevel.build(level_number: 1)
    expect(new_level).to validate_uniqueness_of(:level_number)
  end

  it { is_expected.to have_many(:word_parts) }
end
