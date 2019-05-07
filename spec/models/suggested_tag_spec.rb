require 'rails_helper'

RSpec.describe SuggestedTag, type: :model do
  let(:suggested_tag) { FactoryBot.build(:suggested_tag) }
  
  subject { suggested_tag }

  describe "associations" do
   
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:min_rating) }
    it { should validate_presence_of(:max_rating) }

    it "should not allow max less than min" do
    	suggested_tag.max_rating = 1
    	suggested_tag.min_rating = 2
    	expect(suggested_tag).not_to be_valid
    end

    it "should allow max equal to min" do
    	suggested_tag.max_rating = 2
    	suggested_tag.min_rating = 2
    	expect(suggested_tag).to be_valid
    end

    it "should allow max greater than to min" do
    	suggested_tag.max_rating = 3
    	suggested_tag.min_rating = 2
    	expect(suggested_tag).to be_valid
    end
  end

  describe "between" do
  	it "should get suggested tags between min and max" do
  		SuggestedTag.seed

  		negative_tags = SuggestedTag.between_rating(1,2)
  		expect(negative_tags).to be_present
  		expect(negative_tags.count).to eq(6)
  		expect(negative_tags.first.name).to eq("Disrespected")
  	end
  end
end
