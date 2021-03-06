class Item < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :prefecture
  belongs_to_active_hash :condition
  belongs_to_active_hash :delivery_fee
  belongs_to_active_hash :duration
  belongs_to :category, optional: true
  belongs_to :brand, optional: true

  belongs_to :seller, class_name: 'User', foreign_key: 'seller_id'
  belongs_to :buyer, class_name: 'User', foreign_key: 'buyer_id' ,optional: true
  
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true

  validates :name, :explanation, :price, :prefecture_id, :condition_id, :delivery_fee_id, :duration_id, :category_id, presence: true
  validates_associated :images
  validates :images, presence: true

  # def self.brand_id_search(input)
  #   brand = Brand.find_by(name: input[:brand])
  #   if brand 
  #     brand_id = brand.id
  #   else 
  #     brand_id = nil
  #   end
  # end

  def previous 
    Item.where("id < ?", self.id).order("id DESC").first 
  end 

  def next 
    Item.where("id > ?", self.id).order("id ASC").first 
  end
  
end
