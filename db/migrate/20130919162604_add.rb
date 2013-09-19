class Add < ActiveRecord::Migration
  def up
    add_column :elements, :detailed_distribution, :string, default: ""
  end

  def down
  end
end
