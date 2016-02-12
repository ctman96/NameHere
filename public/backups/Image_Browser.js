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
            if (true) {
                linkEl.href = "";
                imgEl.src = "Placeholder.png";
                document.getElementById(ttl).innerHTML = (this.i + n + 1).toString();
                document.getElementById(auth).innerHTML = "Author";
            }
            else {
            }
        }
        console.log('imagebrowser loaded');
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
    var prev = document.getElementById('bttnprev');
    var next = document.getElementById('bttnnext');
    obj = new Image_Browser();
    obj.Load();
};
function Prev(Comics) {
    obj.comics = Comics;
    obj.Prev();
}
function Next(Comics) {
    obj.comics = Comics;
    obj.Next();
}
