var list = document.getElementById('panels');

function addItem(){
  document.getElementById("length").value++;
  document.getElementById("_length").value++;
  var n = document.getElementById("length").value;
  console.log(n);

  var li = document.createElement("LI");

  var img = document.createElement("img");
  img.src = "http://portfoliotheme.org/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg";
  img.height = "100";
  img.setAttribute("class", "droppable");

  var txt = document.createElement("input");
  txt.setAttribute("type", "text");
  txt.setAttribute("name", 'panels[]');
  console.log(txt.name);
  txt.setAttribute("hidden", true);

  var xdiv = document.createElement("div");
  xdiv.setAttribute("class", "deleteMe");
  xdiv.innerHTML = "X";

  li.appendChild(img);
  li.appendChild(txt);
  li.appendChild(xdiv);

  document.getElementById("panels").appendChild(li);
  $(document).ready(function(){
    $(".deleteMe").on("click", function(){
      $(this).closest("li").find('img').attr('src', "http://portfoliotheme.org/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg");
    });
    $(".deleteMeAlt").on("click", function(){
      $(this).closest("li").remove();
    });
  });
  $(".draggable").draggable({
    helper: "clone",
    revert: "invalid"
  });
  $(".droppable").droppable({
    drop: function(event, ui) {
      $(this).attr("src", ui.draggable.attr("src"));
      $(this).closest("li").find('input').attr('value', ui.draggable.attr("src"));
    }
  });
}
function remItem(){
  if (document.getElementById("length").value > 1){
    document.getElementById("length").value--;
    document.getElementById("_length").value--;
    $('#panels li:last').remove();
  }
}
