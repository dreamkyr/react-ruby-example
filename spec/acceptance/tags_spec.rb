require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource "Tags" do
  before(:all) do
    SuggestedTag.seed
  end

  get "/api/v1/tags/" do
    parameter :page, "Page Number"
    parameter :query, "Search for tag name, optional"
    example "Get All Tags" do
      incident = FactoryBot.create(:incident, tags: ["a"])
      incident = FactoryBot.create(:incident, tags: ["b"])
      incident = FactoryBot.create(:incident, tags: ["c"])
      do_request(query: "a")

      expect(status).to eq 200
    end
  end

  get "/api/v1/tags/suggested" do
    parameter :page, "Page Number"
    parameter :min_rating, "Minimum Rating, defaults to 1"
    parameter :max_rating, "Maximum Rating, defaults to 5"
    example "Suggested Tags" do
      do_request

      expect(status).to eq 200
    end
  end
end