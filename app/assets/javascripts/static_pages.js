
$(document).ready(function() {
    var screenWidth = parseInt(($("#content").css("width")).slice(0,-2));
    var screenHeight = parseInt(($("#content").css("height")).slice(0,-2));
    
    // ACRESCENTAR ELEMENTOS
    $("#sidebar").on("click", "#add_element_button", function() {
	 var group = $("#element_group").val();
	 
	 if (group == "H-Ca") {
	     $(".element").each(function() {
		  if ($(this).data("z") <= 20)
		      $(this).removeClass("hidden");
	     });
	 }
	 else if (group == "Sc-Zn") {
	     $(".element").each(function() {
		  if ($(this).data("z") > 20 && $(this).data("z") <= 30)
		      $(this).removeClass("hidden");
	     });
	 }
	 else if (group == "Ga-Kr") {
	     $(".element").each(function() {
		  if ($(this).data("z") > 30 && $(this).data("z") <= 38)
		      $(this).removeClass("hidden");
	     });
	 }
	 else if (group == "Rb-Sr") {
	     $(".element").each(function() {
		  if ($(this).data("z") > 38 && $(this).data("z") <= 40)
		      $(this).removeClass("hidden");
	     });
	 }

	 
	 if ($(".element").length - $(".hidden").length > 20)
	     $(".element").addClass("mini_element");
    });

    
    // REMOVER ELEMENTOS
    $("#sidebar").on("click", "#remove_element_button", function() {
	 var group = $("#element_group").val();
	 
	 if (group == "H-Ca") {
	     $(".element").each(function() {
		  if ($(this).data("z") <= 20)
		      $(this).addClass("hidden");
	     });
	 }
	 else if (group == "Sc-Zn") {
	     $(".element").each(function() {
		  if ($(this).data("z") > 20 && $(this).data("z") <= 30)
		      $(this).addClass("hidden");
	     });
	 }
	 else if (group == "Ga-Kr") {
	     $(".element").each(function() {
		  if ($(this).data("z") > 30 && $(this).data("z") <= 38)
		      $(this).addClass("hidden");
	     });
	 }
	 else if (group == "Rb-Sr") {
	     $(".element").each(function() {
		  if ($(this).data("z") > 38 && $(this).data("z") <= 40)
		      $(this).addClass("hidden");
	     });
	 }

	 
	 if ($(".element").length - $(".hidden").length <= 20)
	     $(".element").removeClass("mini_element");
    });



    // ALTERAR CORES
    $("#colour").change(function() {
	 var selection = $(this).val();
	 
	 $(".metalColour").removeClass("metalColour");
	 $(".nonMetalColour").removeClass("nonMetalColour");
	 $(".metalloid").removeClass("metalloidColour");


	 if (selection != "Famílias" && selection != "Metais alcalinos" && selection != "Metais alcalino-terrosos" && selection != "Halogéneos" && selection != "Gases nobres") {
	     $(".alcalineColour").removeClass("alcalineColour");
	     $(".terrosoColour").removeClass("terrosoColour");
	     $(".nobleGasColour").removeClass("nobleGasColour");
	     $(".halogenColour").removeClass("halogenColour");
	 }

	if (selection != "Blocos" && selection != "Bloco s" && selection != "Bloco p" && selection != "Bloco d") {
	     $(".sColour").removeClass("sColour");
	     $(".pColour").removeClass("pColour");
	     $(".dColour").removeClass("dColour");
	     
	 }

	 if (selection == "Metais/Não metais") {
	     $(".metal").addClass("metalColour");
	     $(".non_metal").addClass("nonMetalColour");
	     $(".metalloid").addClass("metalColour");
	 }
	 if (selection == "Metais/Não metais (detalhe)") {
	     $(".metal").addClass("metalColour");
	     $(".non_metal").addClass("nonMetalColour");
	     $(".metalloid").addClass("metalloidColour");
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
	if (selection == "Blocos" || selection == "Bloco s") {
	     $(".s").addClass("sColour");
	 }
	if (selection == "Blocos" || selection == "Bloco p") {
	     $(".p").addClass("pColour");
	 }
	if (selection == "Blocos" || selection == "Bloco d") {
	     $(".d").addClass("dColour");
	 }
    });


    // ALTERAR DISTRIBUIÇAO ELECTRONICA
    $("#distribution_selection").change(function() {
	 $(".distribution").hide();
	 $(".detailed_distribution").hide();
	 
	 if ($(this).val() == "Níveis") {
	     $(".distribution").show();
	 }
	 else if ($(this).val() == "Blocos(concisa)") {
	     $(".detailed_distribution").show();
	 }
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
	$(".element").css("z-index", "0");
	    
	if (!dragged.selection_protected) {
	    $(".selected_element").removeClass("selected_element");
	     
	 }
	 
	 dragged.selection_protected = true;
	 dragged.startX = evt.pageX;
	 dragged.startY = evt.pageY;
	 $(this).addClass("selected_element");
	 $(".selected_element").css("z-index", "10");
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

    // attatch elements
    $("#content").on("mouseup", ".element", function() {
	var h = parseInt(($(this).css("height")).slice(0,-2));
	var t = parseInt(($(this).css("top")).slice(0,-2));
	var w = parseInt(($(this).css("width")).slice(0,-2));
	var l = parseInt(($(this).css("left")).slice(0,-2));
	var r = l+w;
	var b = t+h;

	var verticalCenter = t+h/2;
	var horizontalCenter = l+w/2;
	var that = $(this);

	$(".element").each(function() {
	    if(that != $(this)) {
		var height = parseInt(($(this).css("height")).slice(0,-2));
		var top = parseInt(($(this).css("top")).slice(0,-2));
		var width = parseInt(($(this).css("width")).slice(0,-2));
		var left = parseInt(($(this).css("left")).slice(0,-2));
		var right = left+width;
		var bottom = top+height;

		if (l < right && l > left && verticalCenter < bottom && verticalCenter > top) {
		    $(".selected_element").each(function() {
			$(this).css("left", "+="+String(right+screenWidth/150-l));
			$(this).css("top", "+="+String(top-t));
		    });
		    return false;
		}
		else if (r > left && r < right && verticalCenter < bottom && verticalCenter > top) {
		    $(".selected_element").each(function() {
			$(this).css("left", "+="+String(left-width-screenWidth/150-l));
			$(this).css("top", "+="+String(top-t));
		    });
		    return false;
		}
		else if (t > top && t < bottom && horizontalCenter < right && horizontalCenter > left) {
		    $(".selected_element").each(function() {
			$(this).css("left", "+="+String(left-l));
			$(this).css("top", "+="+String(top+height+screenHeight/100-t));
		    });
		    return false;
		}
		else if (b > top && b < bottom && horizontalCenter < right && horizontalCenter > left) {
		    $(".selected_element").each(function() {
			$(this).css("left", "+="+String(left-l));
			$(this).css("top", "+="+String(top-height-screenHeight/100-t));
		    });
		    return false;
		}
	    }
	});
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
		  eLeft = parseInt($(this).css("left").split("p")[0])+parseInt($(this).css("width").split("p")[0])/2; 
		  eTop = parseInt($(this).css("top").split("p")[0])+parseInt($(this).css("height").split("p")[0])/2; 
				     
		  if (eLeft > selectionArea.left && eLeft < selectionArea.left+selectionArea.width && eTop > selectionArea.top && eTop < selectionArea.top+selectionArea.height) {
		      if (!$(this).hasClass("hidden")) {
			  $(this).addClass("selected_element");
		      }
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


    $(".fancytables").fancybox({openEffect	: 'elastic',
				closeEffect	: 'elastic',
			        cyclic: true,
			       });

                  
    var video_map = {0:"#",
	       1:"http://www.youtube.com/watch?v=Vxqe_ZOwsHs",
	       2:"http://www.youtube.com/watch?v=dmcfsEEogxs",
	       3:"http://www.youtube.com/watch?v=oqMN3y8k9So",
	       4:"http://www.youtube.com/watch?v=u_1uLP30uxY",
	       5:"http://www.youtube.com/watch?v=i-rFsFwdkTU",
               6:"http://www.youtube.com/watch?v=edLpxdERQZc",
               7:"http://www.youtube.com/watch?v=zZAiYc3WVXM",
              };

    var table_map = {0:"#",
		     1:"#periodic_link",
		     2:"#extended_link",
		     3:"#benfey_link",
		     4: "#mendeleev_link",
		     5: "#adomah_link",
		     6: "#stowe_link"
              };
   
    var v_link = $("a#video");
	
	v_link.on('click', function(event) {
		if ($(this).attr("href") != "#") {
		                    
		    event.preventDefault();
		    $.fancybox({
			'type' : 'iframe',
			'href' : this.href.replace(new RegExp('watch\\?v=', 'i'), 'embed/') + '?rel=0&autoplay=1',
			'overlayShow' : true,
			'centerOnScroll' : true,
			'speedIn' : 100,
			'speedOut' : 50,
			
		    });
		}
	});


    $("#video_selection").on("change",function() {
	var v = $(this).val();
	v_link.attr("href",video_map[v]);
	
	if (v === "0") {
	    v_link.prop("disabled", true);
	    v_link.addClass("disabled");
	    
	}
	else {
	    v_link.removeClass("disabled");
	    v_link.prop("disabled", false);
	    v_link.click();
	}
	    
    });
    
    var v;
    var t_link = $("a#table_link");
	
    t_link.on("click", function() {
	$(table_map[v]).click();
	console.log(table_map[v]);
    });
    
    $("#table_selection").on("change",function() {
	v = $(this).val();
	
	if (v === "0") {
	    t_link.prop("disabled", true);
	    t_link.addClass("disabled");
	    
	}
	else {
	    t_link.removeClass("disabled");
	    t_link.prop("disabled", false);
	    t_link.click();
	}
	    
    });


    
});
