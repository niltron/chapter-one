require 'rails_helper'

RSpec.describe WordPart, type: :model do
  it { is_expected.to belong_to(:phonics_level) }

  it { is_expected.to validate_presence_of(:label) }
end
