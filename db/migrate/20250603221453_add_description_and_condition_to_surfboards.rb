class AddDescriptionAndConditionToSurfboards < ActiveRecord::Migration[7.1]
  def change
    add_column :surfboards, :description, :text
    add_column :surfboards, :condition, :string
  end
end
