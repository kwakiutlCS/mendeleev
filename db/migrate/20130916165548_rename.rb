class Rename < ActiveRecord::Migration
  def up
    rename_column :elements, :type, :kind
  end

  def down
  end
end
