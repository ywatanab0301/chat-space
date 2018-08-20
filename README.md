# README

# Chat Space DB設計

## messages table
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|text|null: false|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to: user
- belongs_to: group


## users table
|Column|Type|Options|
|------|----|-------|
|name|text|null: false, unique: true, index: true|
|email|text|null: false, unique: true|
|password|string|null: false|

### Association
- has_many: messages
- has_many: members


## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many: messages
- has_many: members


## members table (中間テーブル)
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to: group
- belongs_to: user

