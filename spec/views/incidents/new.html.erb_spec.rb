require 'rails_helper'

RSpec.describe "incidents/new", type: :view do
  before(:each) do
    assign(:incident, Incident.new(
      :text => "MyText",
      :slug => "MyString",
      :rating => 1
    ))
  end

  it "renders new incident form" do
    render

    assert_select "form[action=?][method=?]", incidents_path, "post" do

      assert_select "textarea[name=?]", "incident[text]"

      assert_select "input[name=?]", "incident[slug]"

      assert_select "input[name=?]", "incident[rating]"
    end
  end
end
