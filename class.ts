class Panel {
	uploader : User;
	stripPanel : any;
	constructor(public username, public uploaded) {
        this.uploader = username;
        this.stripPanel = uploaded;
    }
}

class User {
	username : string;
	private password : string;
	checkPassword(entry): boolean {
		return this.password == entry;
	}
	favourites : [ComicStrip];
	profile : [string];
	workspaces : [Workspace];
	constructor(public name, public key) {
        this.username = name;
        this.password = key;
    }
}

class ComicStrip {
	panels : [Panel];
	title : string;
	authors : [User];
	tags : [string];
	private refID : number;
	getrefID(): number {
		return this.refID
	}
	constructor(public imagelist, public name, public userlist, public taglist, public date) {
		this.panels = imagelist;
		this.title = name;
		this.authors = userlist;
		this.tags = taglist;
		this.refID = date;
	}
}

class Workspace {
	strips : [ComicStrip];
	panels : [Panel];
	height : number;
	width : number;
	name : string;
	comic : [Panel];
	constructor(public title) {
		this.height = 1;
		this.width = 3;
		this.name = title;
	}
}
