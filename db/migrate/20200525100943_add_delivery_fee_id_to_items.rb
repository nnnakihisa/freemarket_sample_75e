class AddDeliveryFeeIdToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :delivery_fee_id, :integer
  end
end
