class Image_Browser
{
  i:number;
  comics:any[];
  constructor() {this.i=0; this.comics=[""]}
  Load(){
    for(var n=0;n<6;n++){
      var link:string = "link" + (n+1).toString();
      var linkEl = <HTMLLinkElement>document.getElementById(link)
      var img:string = "img" + (n+1).toString();
      var imgEl = <HTMLImageElement>document.getElementById(img)
      var ttl:string = "ttl" + (n+1).toString();
      var auth:string = "auth" + (n+1).toString();
      if (true)//(this.i + (n+1) >= this.comics.length)
      {
        linkEl.href="";
        imgEl.src="Placeholder.png";
        document.getElementById(ttl).innerHTML = (this.i+n+1).toString();
        document.getElementById(auth).innerHTML = "Author";
      }
      else
      {
        //linkEl.href="/view/" + this.comics[this.i].refId; //make a default comic page, that loads given the ref id? and pass through the refid
        //imgEl.src=this.comics[this.i].panels[0];
        //document.getElementById(ttl).innerHTML = this.comics[this.i].title;
        //var author = "";
        //for(var m=0; m<this.comics[this.i].authors.length;m++){  //if
        //  author = author + this.comics[this.i].authors[m];
        //}
        //document.getElementById(auth).innerHTML = author;
      }
    }
  }
  Prev(){
    this.i = this.i-6;
    if(this.i < 0){
      this.i = 0;
    }
    this.Load();
  }
  Next(){
    this.i = this.i+6;
    if(this.comics.length >= 6 && this.i >= this.comics.length){
      this.i=this.comics.length-6;
    }
    this.Load();
  }

}

var obj;

window.onload = () =>
{
    var login = document.getElementById('bttnlogin');
    var cancel_login = document.getElementById('bttncancel_login');
    var display = document.getElementById('bttnacclogin');
    var acc = document.getElementById('bttnaccount');
    var login_box = document.getElementById("login_box");
    var prev = document.getElementById('bttnprev');
    var next = document.getElementById('bttnnext');
    obj = new Image_Browser();
    obj.Load();

    cancel_login.onclick = function ()
    {
        login_box.style.display = 'none';
    }
    display.onclick = function (req)
    {
        login_box.style.display = 'block';
    }
    acc.onclick = function ()
    {
    }

};

function Prev(){
  obj.Prev();
}
function Next(){
  obj.Next();
}
function Init(Comics){
  obj.comics = Comics;
  obj.i = 0;
  obj.Load();
}
