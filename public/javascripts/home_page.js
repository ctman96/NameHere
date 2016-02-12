var Image_Browser = (function () {
    function Image_Browser() {
        this.i = 0;
        this.comics = [""];
    }
    Image_Browser.prototype.Load = function () {
        for (var n = 0; n < 6; n++) {
            var link = "link" + (n + 1).toString();
            var linkEl = document.getElementById(link);
            var img = "img" + (n + 1).toString();
            var imgEl = document.getElementById(img);
            var ttl = "ttl" + (n + 1).toString();
            var auth = "auth" + (n + 1).toString();
            if (this.i + n + 1 >= this.comics.length) {
                linkEl.href = "";
                imgEl.src = "Placeholder.png";
                document.getElementById(ttl).innerHTML = (this.i + n + 1).toString();
                document.getElementById(auth).innerHTML = "Author";
            }
            else {
                var comic = this.comics[this.i + n + 1];
                //linkEl.href="/view/" + comic.refId; //make a default comic page, that loads given the ref id? and pass through the refid
                imgEl.src = comic.image;
                document.getElementById(ttl).innerHTML = comic.title;
                //var author = "";
                //for(var m=0; m<this.comics[this.i].authors.length;m++){  //if
                //  author = author + this.comics[this.i].authors[m];
                //}
                document.getElementById(auth).innerHTML = comic.author;
            }
        }
    };
    Image_Browser.prototype.Prev = function () {
        this.i = this.i - 6;
        if (this.i < 0) {
            this.i = 0;
        }
        this.Load();
    };
    Image_Browser.prototype.Next = function () {
        this.i = this.i + 6;
        if (this.comics.length >= 6 && this.i >= this.comics.length) {
            this.i = this.comics.length - 6;
        }
        this.Load();
    };
    return Image_Browser;
})();
var obj;
window.onload = function () {
    var login = document.getElementById('bttnlogin');
    var cancel_login = document.getElementById('bttncancel_login');
    var display = document.getElementById('bttnacclogin');
    var acc = document.getElementById('bttnaccount');
    var login_box = document.getElementById("login_box");
    var prev = document.getElementById('bttnprev');
    var next = document.getElementById('bttnnext');
    obj = new Image_Browser();
    obj.Load();
    cancel_login.onclick = function () {
        login_box.style.display = 'none';
    };
    display.onclick = function (req) {
        login_box.style.display = 'block';
    };
    acc.onclick = function () {
    };
};
function Prev() {
    obj.Prev();
}
function Next() {
    obj.Next();
}
function Init(Comics) {
    if (obj) {
        obj.comics = Comics;
        obj.i = 0;
        obj.Load();
    }
    else {
        console.log("failed init");
    }
}
