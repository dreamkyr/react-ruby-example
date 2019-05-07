require 'rails_helper'

RSpec.describe Incident, type: :model do
  let(:incident) { FactoryBot.build(:incident) }
  
  subject { incident }

  describe "associations" do
   
  end

  describe 'validations' do
    #it { should validate_presence_of(:slug) }
    it { incident.save; should validate_uniqueness_of(:slug).case_insensitive }
  end
end
