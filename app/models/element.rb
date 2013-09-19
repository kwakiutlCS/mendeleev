class Element < ActiveRecord::Base
  attr_accessible :A, :Z, :distribution,:block, :name, :kind, :symbol, :family, :detailed_distribution

  def to_s
    symbol
  end
end
