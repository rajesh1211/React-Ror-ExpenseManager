require 'rails_helper'


describe ExpensesController do
  describe "GET index" do
    it "gets the json of expenses" do
      FactoryGirl.create_list(:expense,3)
      get :index
      
      json = JSON.parse(response.body)

      expect(response).to be_success

      expect(json.length).to eq(3)
    end
  end

  describe "GET show" do
    it "Get a single expense" do
      FactoryGirl.create(:expense)      

      get :show, {:id => 1}
      json = JSON.parse(response.body)
      
      expect(json['description']).to eq('dummy')      
    end
  end

  describe "POST create" do
    it "saves the expense" do
      post :create , {:date => "2016-06-11",:description => 'test' ,:amount => 123}

      json = JSON.parse(response.body)
      
      expect(response).to be_success      

      expect(json['description']).to eq('test')
    end
  end

  describe "DELETE destroy" do
    it "Deletes the expense" do
      FactoryGirl.create_list(:expense,3)      

      get :index
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)

      post :destroy , {:id => 1}

      get :index
      json = JSON.parse(response.body)

      expect(json.length).to eq(2)      
    end
  end

  describe "PATCH update" do
    it "Updating the expense" do
      FactoryGirl.create(:expense)      

      get :show, {:id => 1}
      json = JSON.parse(response.body)
      
      patch :update , {:id => 1, :description => 'changed description'}

      get :show, {:id => 1}
      json = JSON.parse(response.body)

      expect(json['description']).to eq('changed description')      
    end
  end
end