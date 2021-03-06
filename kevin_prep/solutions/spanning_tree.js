function Point(x, y) {
	this.x = x
	this.y = y
}


function Edge(point1, point2) {
	this.point1 = point1
	this.point2 = point2
}

Edge.prototype = {

	distance: function() {
		var xDist = this.point2.x - this.point1.x
		var yDist = this.point2.y - this.point1.y

		return Math.sqrt((xDist * xDist) + (yDist * yDist))
	}

}


function DisjointSet(point) {
	this.point = point
	this.parent = null
}

DisjointSet.prototype = {

	setParent: function(parent) {
		this.parent = parent.getParent()
	},

	getParent: function() {
		if (!this.parent) return this

		var p = this.parent.getParent()

		if (p !== this.parent) {
			this.parent = p
		}

		return p
	}
}

// X, Y mapping of disjointed sets
var setMap = {}
function getSet(point) {

	var x = point.x
	var y = point.y

	if (!setMap[x]) {
		setMap[x] = {}
	}

	if (!setMap[x][y]) {
		setMap[x][y] = new DisjointSet(point)
	}

	return setMap[x][y]
}

var EDGE_DEFINES = [
	[[0, 0], [1, 1]],
	[[0, 0], [0, 5]],
	[[0, 5], [5, 5]],
	[[0, 5], [1, 4]],
	[[1, 4], [1, 1]],
	[[1, 4], [2, 3]],
	[[1, 4], [4, 4]],
	[[1, 1], [5, 1]],
	[[1, 1], [2, 2]],
	[[5, 5], [4, 4]],
	[[5, 1], [4, 2]],
	[[5, 1], [5, 5]],
	[[2, 2], [4, 2]],
	[[2, 2], [2, 3]],
	[[2, 3], [3, 3]],
	[[3, 3], [4, 4]],
	[[4, 2], [4, 4]]
]

// Create edge objects
var edges = []
EDGE_DEFINES.forEach(function(definition) {
	var point1 = new Point(definition[0][0], definition[0][1])
	var point2 = new Point(definition[1][0], definition[1][1])
	edges.push(new Edge(point1, point2))
})

// Sort edges
edges.sort(function(a, b) {
	return a.distance() - b.distance()
})

var usedEdges = []

while (edges.length) {
	var edge = edges.shift()

	var set1 = getSet(edge.point1).getParent()
	var set2 = getSet(edge.point2).getParent()

	if (set1 === set2) {
		usedEdges.push(edge)
		continue
	}

	set2.setParent(set1)	
}

printTree(setMap)

function printTree(edges) {
	console.log('Required edges:')

	usedEdges.forEach(function(edge) {
		var p1 = edge.point1
		var p2 = edge.point2
		console.log('Edge: ' + p1.x + ', ' + p1.y + ' - ' + p2.x + ', ' + p2.y)
	})
}
