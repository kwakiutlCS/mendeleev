
$(document).ready(function() {
    
    
    $("#sidebar").on("click", "#add_element_button", function() {
	 var symbol = $("#element").val();
	 
	 $.ajax("get_symbol",
		 {method: "get",
		  data: {symbol: symbol}
		 });
	 
    });


    $("#colour").change(function() {
	 var selection = $(this).val();
	 
	 $(".metalColour").removeClass("metalColour");
	 $(".nonMetalColour").removeClass("nonMetalColour");

	 if (selection == "Normal" || selection == "Metais/Não metais") {
	     $(".alcalineColour").removeClass("alcalineColour");
	     $(".terrosoColour").removeClass("terrosoColour");
	     $(".nobleGasColour").removeClass("nobleGasColour");
	     $(".halogenColour").removeClass("halogenColour");
	 }

	 if (selection == "Metais/Não metais") {
	     $(".metal").addClass("metalColour");
	     $(".non_metal").addClass("nonMetalColour");
	 }
	 if (selection == "Famílias" || selection == "Metais alcalinos") {
	     $(".alcaline").addClass("alcalineColour");
	 }
	  if (selection == "Famílias" || selection == "Metais alcalino-terrosos") {
	     $(".terroso").addClass("terrosoColour");
	 }
	  if (selection == "Famílias" || selection == "Halogéneos") {
	     $(".halogen").addClass("halogenColour");
	 }
	 if (selection == "Famílias" || selection == "Gases nobres") {
	     $(".noble_gas").addClass("nobleGasColour");
	 }
    });


    $("#distribution").change(function() {
	 if ($("input:checked").length)
	     $(".distribution").show();
	 else
	     $(".distribution").hide();
    });



    
    var selectionArea= {dragging: false};

    $("#content").on("mousedown", function(evt) {
	 $(".selected_element").removeClass("selected_element");
	 selectionArea = {dragging: false, startX: false, startY: false, left: false, top: false, width: false, height: false};
	 selectionArea.startX = evt.pageX;
	 selectionArea.startY = evt.pageY;
	 
	 selectionArea.dragging = true;
	 $("#content").append("<div id='selection_area'></div>");
	 $("#selection_area").css({left:evt.pageX+"px", top:evt.pageY+"px"});
	 
    });
    $("body").on("mouseup", function(evt) {
	 
	 if (selectionArea.dragging) {
	     $(".element").each(function() {
		  eLeft = parseInt($(this).css("left").split("p")[0]); 
		  eTop = parseInt($(this).css("top").split("p")[0]); 
				     
		  if (eLeft > selectionArea.left && eLeft < selectionArea.left+selectionArea.width && eTop > selectionArea.top && eTop < selectionArea.top+selectionArea.height) {
		      $(this).addClass("selected_element");
		  }
	     });
	 }
	 selectionArea.dragging = false;
	 $("#selection_area").remove();
    });
    $("#content").on("mousemove", function(evt) {
	 if (selectionArea.dragging) {
	     var area = $("#selection_area");
	     if ($(".ui-draggable-dragging").length) {
		  area.remove();
		  selectionArea.dragging = false;
		  return;
	     }
	     
	     
	     if (evt.pageX > selectionArea.startX) {
		  selectionArea.left = selectionArea.startX;
		  selectionArea.width = evt.pageX - selectionArea.left;
	     }
	     else {
		  selectionArea.left = evt.pageX;
		  selectionArea.width = selectionArea.startX - selectionArea.left;
	     }
	     if (evt.pageY > selectionArea.startY) {
		  selectionArea.top = selectionArea.startY;
		  selectionArea.height = evt.pageY - selectionArea.top;
	     }
	     else {
		  selectionArea.top = evt.pageY;
		  selectionArea.height = selectionArea.startY - selectionArea.top;
	     }

	     area.css({left: selectionArea.left+"px", top: selectionArea.top+"px", width: selectionArea.width+"px", height: selectionArea.height+"px"});
	 }
    });
  
});
