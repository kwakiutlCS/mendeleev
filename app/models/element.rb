class Element < ActiveRecord::Base
  attr_accessible :A, :Z, :distribution, :mendeleev, :name, :kind, :symbol, :family, :photo, :detailed_distribution

  def to_s
    symbol
  end
end
