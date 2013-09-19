class AddBlockToElement < ActiveRecord::Migration
  def change
    add_column :elements, :block, :string
  end
end
