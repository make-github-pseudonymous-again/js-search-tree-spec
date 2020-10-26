export default function DummySearchTree(compare) {
	this.compare = compare;
	this.array = [];
	this.length = 0;
}

DummySearchTree.prototype.insert = function (value) {
	this.array.push(value);
	++this.length;
	this.array.sort(this.compare);
	return this;
};

DummySearchTree.prototype.remove = function (value) {
	const callback = (other) => this.compare(other, value) === 0;
	const index = this.array.findIndex(callback);
	if (index !== -1) {
		this.array.splice(index, 1);
		--this.length;
	}

	return this;
};

DummySearchTree.prototype.find = function (value) {
	const callback = (other) => this.compare(other, value) === 0;
	const index = this.array.findIndex(callback);
	return index === -1 ? [false, null] : [true, this.array[index]];
};

DummySearchTree.prototype[Symbol.iterator] = function () {
	return this.array[Symbol.iterator]();
};
