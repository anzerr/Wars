
var _indexedDB = function( name, tab, run, init ) {
	var him = this;
	him.loaded = false;
	him.indexedDB = {};
	
	him.run = ( (typeof(run) == "undefined")? function(){} : run );
	him.init = ( (typeof(init) == "undefined")? function(){} : init );
	him.update = false;
	him.name = name;
	him.version = 1;
	him.table = tab;

	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

	if (!window.indexedDB) {
		console.log("browser does not have indexedDB");
		return (false);
	}
	var request = indexedDB.open( him.name );
	
	request.onupgradeneeded = function( e ) {
		var db = e.target.result;
		if ( db.objectStoreNames.contains( him.table ) )
			db.deleteObjectStore( him.table );
		db.createObjectStore( him.table, {keyPath: "id", autoIncrement: true} );
		console.log("upgrade");
		him.update = true;	
	};
	
	request.onsuccess = function( e ) {
		him.indexedDB.db = e.target.result;
		him.loaded = true;
		console.log("success");
		if ( him.update ) {
			him.init( him );
		} else {
			him.run();
		}
	};
	
	request.onerror = him.error;
}

_indexedDB.prototype.error = function( e ) {	
	console.log("error indexedDB ----")
	console.log( e );
	console.log("----")
	return (false);
}

_indexedDB.prototype._query = function( t, a, callback ) {	
	if (!this.loaded)
		return ( this.error( "database not loaded" ) );
		
	try {
		var store = this.indexedDB.db.transaction( [this.table], "readwrite" ).objectStore( this.table )
	}
	catch (ex) {
		this.error(ex.message);
		return (false);
	}
	var a = store[t]( a );
	if (callback)
		a.onsuccess = callback;
	a.onerror = this.error;
}

_indexedDB.prototype.set = function( id, obj, callback ) {
	this._query( "put", { "id":id, "obj":obj }, ( (typeof(callback) == "undefined")? function(){} : callback ) );
}

_indexedDB.prototype.get = function( a ) {	
	var him = a.p;
	this._query( "openCursor", ( (a.a)? IDBKeyRange.bound( a.a, ((a.b)? a.b : a.a) ) : IDBKeyRange.lowerBound(0) ), function(e) {
		var result = e.target.result;
		if (result) {
			( ( !isset(him) )? a.callback( result.value ) : him[a.callback]( result.value ) );
			result.continue();
		}
	} );
}

_indexedDB.prototype.delete = function( id ) {	
	this._query( "delete", id );
}
