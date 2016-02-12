class Image_Browser
{
  var i;
  Load(i, comics){
    for(var n=0;n<6;n++){
      var link:string = "link" + n.toString();
      var img:string = "img" + n.toString();
      var ttl:string = "ttl" + n.toString();
      var auth:string = "auth" + n.toString();
      if (i+n >= comics.length)
      {
        document.getElementById(link).href="";
        document.getElementById(img).src="";
        document.getElementById(ttl).innerHTML = i.toString();
        document.getElementById(auth).innerHTML = "";
      }
      else
      {
        document.getElementById(link).href="/view/" + comics[i].refId; //make a default comic page, that loads given the ref id? and pass through the refid
        document.getElementById(img).src=comics[i].panels[0];
        document.getElementById(ttl).innerHTML = comics[i].title;
        var author = "";
        for(var m=0;m<comics[i].authors.length;m++){  //if
          author = author + comics[i].authors[m];
        }
        document.getElementById(auth).innerHTML = author;
      }
    }
  }

}

window.onload = () =>
{
  var prev = document.getElementById('bttnprev');
  var next = document.getElementById('bttnnext');
  var obj = new Image_Browser;
  var i = 0;
  var comics = <%Comics%>;
  };
  obj.i=0;
  obj.Load(i, comics);
  prev.onclick = function ()
  {
    i = i-6;
    if(i < 0){
      i = 0;
    }
    obj.Load(i, comics);
  }

  next.onclick = function ()
  {
    if(comics.length >= 6 && i >= comics.length){
      i=comics.length-6;
    }
    i = i+6;
    obj.Load(i, comics);
  }
}
