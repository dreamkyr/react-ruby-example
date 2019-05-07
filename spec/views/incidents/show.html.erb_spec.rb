require 'rails_helper'

RSpec.describe "incidents/show", type: :view do
  before(:each) do
    @incident = assign(:incident, Incident.create!(
      :text => "MyText",
      :slug => "Slug",
      :rating => 2
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/MyText/)
    expect(rendered).to match(/Slug/)
    expect(rendered).to match(/2/)
  end
end
