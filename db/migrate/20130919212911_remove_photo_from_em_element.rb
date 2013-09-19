class RemovePhotoFromEmElement < ActiveRecord::Migration
  def up
    remove_column :elements, :photo
  end

  def down
    add_column :elements, :photo, :boolean
  end
end
