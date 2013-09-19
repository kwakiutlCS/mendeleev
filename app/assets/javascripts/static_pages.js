
$(document).ready(function() {
    
    // ACRESCENTAR ELEMENTOS
    $("#sidebar").on("click", "#add_element_button", function() {
	 $(".element").show();
	 
    });


    // ALTERAR CORES
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


    // ALERAR DISTRIBUIÇAO ELECTRONICA
    $("#distribution").change(function() {
	 if ($("input:checked").length)
	     $(".distribution").show();
	 else
	     $(".distribution").hide();
    });



    // SELECÇÂO
    var selectionArea= {dragging: false};
    var dragged = {selection_protected: false};
    
    $("#content").on("mousedown", ".selected_element", function(evt){
	 dragged.selection_protected = true;
	 dragged.startX = evt.pageX;
	 dragged.startY = evt.pageY;
    });

    $("#content").on("mousedown", ".element", function(evt) {
	 if (!dragged.selection_protected) {
	     $(".selected_element").removeClass("selected_element");
	 }
	 
	 dragged.selection_protected = true;
	 dragged.startX = evt.pageX;
	 dragged.startY = evt.pageY;
	 $(this).addClass("selected_element");
    });

    $("#content").on("mousedown", function(evt) {
	 if (!dragged.selection_protected) {
	     $(".selected_element").removeClass("selected_element");
	 }
	 

	 selectionArea = {dragging: false, startX: false, startY: false, left: false, top: false, width: false, height: false};
	 selectionArea.startX = evt.pageX;
	 selectionArea.startY = evt.pageY;
	 
	 selectionArea.dragging = true;
	 $("#content").append("<div id='selection_area'></div>");
	 $("#selection_area").css({left:evt.pageX+"px", top:evt.pageY+"px"});
	 
    });

    
    // IMAGEM DOS ELEMENTOS
    var imgShow = {x: false, y: false, title: false, symbol: false};
    
    $("#content").on("mousedown", ".element", function(evt){
	 imgShow = {x: evt.pageX, y: evt.pageY, title: $(this).data("title"), symbol: $(this).data("symbol")};
	 
    });

    $("body").on("mouseup", function(evt) {
	 
	 if (Math.abs(evt.pageX-imgShow.x) < 1 && Math.abs(evt.pageY-imgShow.y) < 1) {
	     $("#content").append("<a class='fancybox' id='fancylink' href='assets/"+imgShow.symbol+".jpg' title='"+imgShow.title+"'></a>");
      
	 $("#fancylink").fancybox();
      	  $("#fancylink").click();
      	  $("#fancylink").remove();
	 }
	 
	 
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

	 dragged.selection_protected = false;
    });

    $("#content").on("mousemove", function(evt) {
	 if (selectionArea.dragging) {
	     var area = $("#selection_area");
	     if ($(".selected_element").length) {
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
	 
	 if (dragged.selection_protected) {
	     var that, content = $("#content");
	     var blockWidth = parseInt($(".element").first().css("width").split("p")[0]);
	     var blockHeight = parseInt($(".element").first().css("height").split("p")[0]);
	     var deltaX = String(evt.pageX-dragged.startX);
	     var deltaY = String(evt.pageY-dragged.startY);
	     $(".selected_element").css({"left": "+="+deltaX, "top": "+="+deltaY});
	     $(".selected_element").each(function() {
		  that = $(this);
		  
		  if (parseInt(that.css("left").split("p")[0]) < 0 || parseInt(that.css("left").split("p")[0])+blockWidth > parseInt(content.css("width").split("p")[0]) || parseInt(that.css("top").split("p")[0]) < 0 || parseInt(that.css("top").split("p")[0])+blockHeight > parseInt(content.css("height").split("p")[0])) {
		      $(".selected_element").css({"left": "-="+deltaX, "top": "-="+deltaY});
		      
		      return;
		  }
		      
	     });
	     dragged.startX = evt.pageX;
	     dragged.startY = evt.pageY;
	 }
    });


    
    

   
    
    
  
});
