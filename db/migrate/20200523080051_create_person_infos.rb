class CreatePersonInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :person_infos do |t|
      t.references :user,         null: false, foreign_key: true
      t.string     :family_name,  null: false
      t.string     :first_name,   null: false
      t.string     :family_kana,  null: false
      t.string     :first_kana,   null: false
      t.date       :birth_date,   null: false
      t.timestamps
    end 
  end
end
