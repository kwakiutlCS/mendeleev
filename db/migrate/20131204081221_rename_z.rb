class RenameZ < ActiveRecord::Migration
  def up
    rename_column :elements, :Z, :z
  end

  def down
  end
end
