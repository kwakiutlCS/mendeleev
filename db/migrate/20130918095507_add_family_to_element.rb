class AddFamilyToElement < ActiveRecord::Migration
  def change
    add_column :elements, :family, :string
  end
end
