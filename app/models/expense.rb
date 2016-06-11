class Expense < ActiveRecord::Base
  validates :date, presence: true
  validates :description, presence: true
  validates :amount, presence: true
end
