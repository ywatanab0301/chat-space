FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/uploads/message/image/16/photo-1483691278019-cb7253bee49f.jpeg")
    user
    group
  end
end
