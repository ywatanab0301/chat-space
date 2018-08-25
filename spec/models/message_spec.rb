require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
    # メッセージがあれば保存できる
      it "is valid with a body" do
        expect(build(:message, image: nil)).to be_valid
      end
    # 画像があれば保存できる
      it "is valid with a image" do
        expect(build(:message, body: nil)).to be_valid
      end
    # メッセージと画像があれば保存できる
      it "is valid with both message and image" do
        expect(build(:message)).to be_valid
      end

    end

    context 'can not save' do
    # メッセージも画像もないと保存できない
      it "is invalid without both message and image" do
        message = build(:message, body: nil, image: nil)
        message.valid?
        expect(message.errors[:body]).to include('を入力してください')
      end
    # group_idがないと保存できない
      it "is invalid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end
    # user_idがないと保存できない
      it "is invalid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end
  end
end
