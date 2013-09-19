class AddPhotoToElement < ActiveRecord::Migration
  def change
    add_column :elements, :photo, :boolean, default: true
  end
end
