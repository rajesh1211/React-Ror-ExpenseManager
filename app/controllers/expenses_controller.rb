class ExpensesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def index
    begin
      expenses = Expense.all.offset(params[:offset]).limit(params[:limit]).order("id desc")
      render json: expenses.to_json, status: :ok
    rescue => e
      logger.error "Exception: #{e.message}"
      render json: {message: 'Something went wrong'} , status: :internal_server_error
    end  
  end  

  def show
    begin
      expense = Expense.find(params[:id])
      render json: expense.to_json, status: :ok
    rescue => e
      logger.error "Exception: #{e.message}"
      render json: {message: 'Something went wrong'} , status: :internal_server_error
    end  
  end  

  def create
    begin
      expense = Expense.new
      expense.date = params[:date]
      expense.description = params[:description]
      expense.amount = params[:amount]
      expense.save!
      expense.reload
      
      render json: expense.to_json , status: :ok
    rescue => e
      logger.error "Exception: #{e.message}"
      render json: {message: 'Something went wrong'} , status: :internal_server_error
    end    
  end

  def update
    begin
      expense = Expense.find(params[:id])

      expense.date        = params[:date]         if params[:date] != nil
      expense.description = params[:description]  if params[:description] != nil
      expense.amount      = params[:amount]       if params[:amount] != nil
      expense.save!
      
      render json: expense.to_json , status: :ok
    rescue => e
      logger.error "Exception: #{e.message}"
      render json: {message: 'Something went wrong'} , status: :internal_server_error
    end    
  end

  def destroy
    begin
      expense = Expense.find(params[:id])
      expense.destroy
      render json: {message: 'expense deleted successfully'}, status: :ok
    rescue => e
      logger.error "Exception: #{e.message}"
      render json: {message: 'Something went wrong'} , status: :internal_server_error
    end    
  end

end
