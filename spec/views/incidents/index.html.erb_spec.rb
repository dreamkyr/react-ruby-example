require 'rails_helper'

RSpec.describe "incidents/index", type: :view do
  before(:each) do
    assign(:incidents, [
      Incident.create!(
        :text => "MyText",
        :slug => "Slug",
        :rating => 2
      ),
      Incident.create!(
        :text => "MyText",
        :slug => "Slug",
        :rating => 2
      )
    ])
  end

  it "renders a list of incidents" do
    render
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "Slug".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
  end
end
