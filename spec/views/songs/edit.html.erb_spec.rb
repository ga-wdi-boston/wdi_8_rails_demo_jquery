require 'spec_helper'

describe "songs/edit" do
  before(:each) do
    @song = assign(:song, stub_model(Song,
      :name => "MyString",
      :duration => 1,
      :price => 1.5
    ))
  end

  it "renders the edit song form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", song_path(@song), "post" do
      assert_select "input#song_name[name=?]", "song[name]"
      assert_select "input#song_duration[name=?]", "song[duration]"
      assert_select "input#song_price[name=?]", "song[price]"
    end
  end
end
