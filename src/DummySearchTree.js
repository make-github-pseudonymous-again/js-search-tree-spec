import assert from 'assert';

export default function DummySearchTree(compare, sortedArray = []) {
	this.compare = compare;
	this.array = sortedArray;
	this.length = sortedArray.length;
}

DummySearchTree.from = function (compare, iterable) {
	return new DummySearchTree(compare, [...iterable].sort(compare));
};

DummySearchTree.prototype.isEmpty = function () {
	return this.length === 0;
};

DummySearchTree.prototype._eq = function (key) {
	return (other) => this.compare(other, key) === 0;
};

DummySearchTree.prototype._ge = function (key) {
	return (other) => this.compare(other, key) >= 0;
};

DummySearchTree.prototype._le = function (key) {
	return (other) => this.compare(other, key) <= 0;
};

DummySearchTree.prototype._arrayIndex = function (key) {
	return this.array.findIndex(this._eq(key));
};

DummySearchTree.prototype.has = function (key) {
	return this._arrayIndex(key) !== -1;
};

DummySearchTree.prototype._predecessorIndex = function (key) {
	const arrayIndex = this.array.findIndex(this._ge(key));
	const index = arrayIndex === -1 ? this.length - 1 : arrayIndex - 1;
	assert(index >= -1 && index < this.length);
	return index;
};

DummySearchTree.prototype._successorIndex = function (key) {
	this.array.reverse();
	const arrayIndex = this.array.findIndex(this._le(key));
	this.array.reverse();
	const index = arrayIndex + 1;
	assert(index >= 0 && index <= this.length);
	return index;
};

DummySearchTree.prototype._rangeIndices = function (left, right) {
	const leftIndex = this.array.findIndex(this._ge(left));
	let rightIndex = leftIndex;
	while (this.compare(this.array[rightIndex], right) < 0) ++rightIndex;
	return [leftIndex, rightIndex];
};

DummySearchTree.prototype._rangeIndicesInclusive = function (left, right) {
	const leftIndex = this.array.findIndex(this._ge(left));
	let rightIndex = leftIndex;
	while (this.compare(this.array[rightIndex], right) <= 0) ++rightIndex;
	return [leftIndex, rightIndex];
};

DummySearchTree.prototype._keyIndices = function (key) {
	return this._rangeIndicesInclusive(key, key);
};

// TODO insert/add/insertFirst/insertLast
DummySearchTree.prototype.insert = function (key) {
	this.array.push(key);
	++this.length;
	this.array.sort(this.compare);
	return this;
};

// TODO updateFirst? upsert? updateLast, updateAll?
DummySearchTree.prototype.update = function (key) {
	const index = this._arrayIndex(key);
	if (index === -1) return this.insert(key);
	this.array[index] = key;
	return this;
};

// TODO remove/delete/removeFirst/removeLast
DummySearchTree.prototype.remove = function (key) {
	const index = this._arrayIndex(key);
	if (index !== -1) {
		this.array.splice(index, 1);
		--this.length;
	}

	return this;
};

DummySearchTree.prototype.removeAll = function (key) {
	const [i, j] = this._keyIndices(key);
	const n = j - i;
	if (n !== 0) {
		this.array.splice(i, n);
		this.length -= n;
	}

	return this;
};

// TODO find/search/get/findFirst/findLast
DummySearchTree.prototype.find = function (key) {
	const index = this._arrayIndex(key);
	return index === -1 ? [false, null] : [true, this.array[index]];
};

DummySearchTree.prototype.predecessor = function (key) {
	const index = this._predecessorIndex(key);
	return index === -1 ? undefined : this.array[index];
};

DummySearchTree.prototype.successor = function (key) {
	const index = this._successorIndex(key);
	return index === this.array.length ? undefined : this.array[index];
};

// TODO minKey?
DummySearchTree.prototype.leftMost = function () {
	return this.length === 0 ? undefined : this.array[0];
};

// TODO maxKey?
DummySearchTree.prototype.rightMost = function () {
	return this.length === 0 ? undefined : this.array[this.length - 1];
};

// TODO meld/merge
DummySearchTree.prototype.meld = function (other) {
	this.array = this.array.concat([...other]);
	this.array.sort(this.compare);
	this.length = this.array.length;
	return this;
};

// TODO inclusive ? (left, right), [left, right), [left, right], (left, right]
DummySearchTree.prototype.range = function* (left, right) {
	const [i, j] = this._rangeIndices(left, right);
	for (let k = i; k < j; ++k) yield this.array[k];
};

DummySearchTree.prototype.items = function () {
	return this.array[Symbol.iterator]();
};

DummySearchTree.prototype[Symbol.iterator] = function () {
	return this.items();
};
