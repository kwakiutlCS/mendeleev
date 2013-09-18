class CreateElements < ActiveRecord::Migration
  def change
    create_table :elements do |t|
      t.string :name
      t.integer :Z
      t.integer :A
      t.string :type
      t.boolean :mendeleev
      t.string :distribution

      t.timestamps
    end
  end
end
