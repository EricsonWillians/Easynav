(function($) {
	$.fn.easy = function(elements, brand) {
		this.navStates = (function() {
			var a = {};
			$.each(elements, function(i, val) {
				if (i == 0) {
					a[val] = [true, i];
				} else {
					a[val] = [false, i];
				}
			}.bind(this));
			return a;
		})();
		this.hashes = elements;
		this.navSelectors = (function() {
			var a = {};
			$.each(elements, function(i, val) {
				if (brand) {
					if (i === 0) {
						a[val] = "navbar-brand";
					} else {
						a[val] = "navbar-nav li:eq(" + (i - 1).toString() + ")";
					}
					$('.' + a[val]).bind("mousedown", function() {
						//	this.activate(val);
					});
				} else {
					a[val] = "navbar-nav li:eq(" + (i).toString() + ")";
				}
			}.bind(this));
			return a;
		})();
		this.navLinks = {};
		return this;
	};
	$.fn.associate = function(links) {
		var size = 0, key;
	    for (key in this.navStates) {
	        if (this.navStates.hasOwnProperty(key)) size++;
	    }
		if (size === links.length) {
			var i = 0;
			$.each(this.navStates, function(key, val) {
				this.navLinks[key] = links[i];
				i++;
			}.bind(this));
		} else {
			console.log("The length of the nav's array of states is not the same as the length of the given array os links.'");	
		}
		return this;
	};
	$.fn.watch = function() {
		$(window).bind("hashchange", function() {
			if ($.inArray(location.hash, this.navStates)) {
				$.each(this.navStates, function(key, val) {
					if (key === location.hash) {
						val[0] = true;
					//	$("#content").load((this.navLinks[location.hash]));
						$('.' + this.navSelectors[key]).addClass("active");
					} else {
						val[0] = false;
						$('.' + this.navSelectors[key]).removeClass("active");
					}
				}.bind(this));
			} else {
				console.log("There's no such hash within the nav's array of states.");
			}
		}.bind(this));
		$(document).bind("keyup", function(e) {
			switch(e.which) {
				case 37:
					var last = this.hashes.length - 1;
					for (var i = 0; i < this.hashes.length; i++) {
						if (this.navStates[this.hashes[i]][0]) {
							if (i === 0) {
								this.navStates[this.hashes[last]][0] = true;
								$('.' + this.navSelectors[this.hashes[last]]).addClass("active");
								for (var j = 0; j < this.hashes.length; j++) {
									if (j !== last) {
										this.navStates[this.hashes[j]][0] = false;
										$('.' + this.navSelectors[this.hashes[j]]).removeClass("active");
									}
								}
								window.location.hash = this.hashes[last];
								break;
							} else {
								this.navStates[this.hashes[i-1]][0] = true;
								$('.' + this.navSelectors[this.hashes[i-1]]).addClass("active");
								for (var j = 0; j < this.hashes.length; j++) {
									if (j !== i-1) {
										this.navStates[this.hashes[j]][0] = false;
										$('.' + this.navSelectors[this.hashes[j]]).removeClass("active");
									}
								}
								window.location.hash = this.hashes[i-1];
								break;
							}
						} 
					}
				break;
				case 39:
					var last = this.hashes.length - 1;
					for (var i = 0; i < this.hashes.length; i++) {
						if (this.navStates[this.hashes[i]][0]) {
							if (i === last) {
								this.navStates[this.hashes[0]][0] = true;
								$('.' + this.navSelectors[this.hashes[0]]).addClass("active");
								for (var j = 0; j < this.hashes.length; j++) {
									if (j !== 0) {
										this.navStates[this.hashes[j]][0] = false;
										$('.' + this.navSelectors[this.hashes[j]]).removeClass("active");
									}
								}
								window.location.hash = this.hashes[0];
								break;
							} else {
								this.navStates[this.hashes[i+1]][0] = true;
								$('.' + this.navSelectors[this.hashes[i+1]]).addClass("active");
								for (var j = 0; j < this.hashes.length; j++) {
									if (j !== i+1) {
										this.navStates[this.hashes[j]][0] = false;
										$('.' + this.navSelectors[this.hashes[j]]).removeClass("active");
									}
								}
								window.location.hash = this.hashes[i+1];
								break;
							}
						} 
					}
				break;
				default: return; 
			}
			e.preventDefault();
		}.bind(this));
		return this;
	}
}(jQuery)); 