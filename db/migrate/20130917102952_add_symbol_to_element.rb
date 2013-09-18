class AddSymbolToElement < ActiveRecord::Migration
  def change
    add_column :elements, :symbol, :string
  end
end
