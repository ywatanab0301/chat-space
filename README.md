# README

# Chat Space DB設計

## messages table
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|text||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to: user
- belongs_to: group


## users table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|

### Association
- has_many: messages
- has_many: members
- has_many: groups, through: :members


## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many: messages
- has_many: members
- has_many: users, through: :members


## members table (中間テーブル)
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to: group
- belongs_to: user

