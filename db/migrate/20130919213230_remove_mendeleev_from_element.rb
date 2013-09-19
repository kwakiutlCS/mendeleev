class RemoveMendeleevFromElement < ActiveRecord::Migration
  def up
    remove_column :elements, :mendeleev
  end

  def down
    add_column :elements, :mendeleev, :boolean
  end
end
