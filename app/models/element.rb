class Element < ActiveRecord::Base
  attr_accessible :A, :Z, :distribution, :mendeleev, :name, :kind, :symbol, :family

  def to_s
    symbol
  end
end
