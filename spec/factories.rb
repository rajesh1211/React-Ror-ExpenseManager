FactoryGirl.define do
  factory :expense do |f|
      f.date '12-11-2019'
      f.description "dummy"
      f.amount 12345
  end
end