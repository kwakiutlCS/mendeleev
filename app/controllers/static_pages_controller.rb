class StaticPagesController < ApplicationController

def index
  @elements = Element.order("z")
end


def get_element
  if params[:symbol] == "H-Ca"
    @elements = Element.where("z <= 20").order("z")
  end

  respond_to do |format|
    format.js 
  end
end

end
