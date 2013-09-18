class StaticPagesController < ApplicationController

def index
  @elements = Element.all
  
end


def get_element
  if params[:symbol] == "H-Ca"
    @elements = Element.where("Z <= 20").order("Z")
  end

  respond_to do |format|
    format.js 
  end
end

end
