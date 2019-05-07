require 'rails_helper'

RSpec.describe "incidents/edit", type: :view do
  before(:each) do
    @incident = assign(:incident, Incident.create!(
      :text => "MyText",
      :slug => "MyString",
      :rating => 1
    ))
  end

  it "renders the edit incident form" do
    render

    assert_select "form[action=?][method=?]", incident_path(@incident), "post" do

      assert_select "textarea[name=?]", "incident[text]"

      assert_select "input[name=?]", "incident[slug]"

      assert_select "input[name=?]", "incident[rating]"
    end
  end
end
