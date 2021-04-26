:mag: [@aureooms/js-search-tree-spec](https://make-github-pseudonymous-again.github.io/js-search-tree-spec)
==

Search tree specification for JavaScript.
See [docs](https://make-github-pseudonymous-again.github.io/js-search-tree-spec).
Parent is [@aureooms/js-bst](https://github.com/make-github-pseudonymous-again/js-bst).

```js
// eslint-disable-next-line ava/use-test
import ava from 'ava' ;
import * as spec from '@aureooms/js-search-tree-spec' ;

spec.test(
  ava ,
  {
    name: "DummySearchTree" , // Name for the implementation
    empty: compare => new spec.DummySearchTree(compare) , // Return an empty search tree using `compare` to order keys
    from: (compare, iterable) => spec.DummySearchTree.from(compare, iterable) , // Return a search tree using `compare` to order keys initialized with the values in iterable
  } ,
  {
    length : true , // Do the implementations maintain a `length` property?
    lengths : [0, 1, 16, 17, 31, 32, 33, 63, 64, 65] , // Tree sizes to test.
  }
) ;
```

[![License](https://img.shields.io/github/license/make-github-pseudonymous-again/js-search-tree-spec.svg)](https://raw.githubusercontent.com/make-github-pseudonymous-again/js-search-tree-spec/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@aureooms/js-search-tree-spec.svg)](https://www.npmjs.org/package/@aureooms/js-search-tree-spec)
[![Build](https://img.shields.io/travis/make-github-pseudonymous-again/js-search-tree-spec/main.svg)](https://travis-ci.org/make-github-pseudonymous-again/js-search-tree-spec/branches)
[![Dependencies](https://img.shields.io/david/make-github-pseudonymous-again/js-search-tree-spec.svg)](https://david-dm.org/make-github-pseudonymous-again/js-search-tree-spec)
[![Dev dependencies](https://img.shields.io/david/dev/make-github-pseudonymous-again/js-search-tree-spec.svg)](https://david-dm.org/make-github-pseudonymous-again/js-search-tree-spec?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/make-github-pseudonymous-again/js-search-tree-spec.svg)](https://github.com/make-github-pseudonymous-again/js-search-tree-spec/issues)
[![Downloads](https://img.shields.io/npm/dm/@aureooms/js-search-tree-spec.svg)](https://www.npmjs.org/package/@aureooms/js-search-tree-spec)

[![Code issues](https://img.shields.io/codeclimate/issues/make-github-pseudonymous-again/js-search-tree-spec.svg)](https://codeclimate.com/github/make-github-pseudonymous-again/js-search-tree-spec/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/make-github-pseudonymous-again/js-search-tree-spec.svg)](https://codeclimate.com/github/make-github-pseudonymous-again/js-search-tree-spec/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/make-github-pseudonymous-again/js-search-tree-spec/main.svg)](https://codecov.io/gh/make-github-pseudonymous-again/js-search-tree-spec)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/make-github-pseudonymous-again/js-search-tree-spec.svg)](https://codeclimate.com/github/make-github-pseudonymous-again/js-search-tree-spec/trends/technical_debt)
[![Documentation](https://make-github-pseudonymous-again.github.io/js-search-tree-spec//badge.svg)](https://make-github-pseudonymous-again.github.io/js-search-tree-spec//source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@aureooms/js-search-tree-spec)](https://bundlephobia.com/result?p=@aureooms/js-search-tree-spec)

## :newspaper: Description

This package contains a specification test suite for search tree
implementations such as
[@aureooms/js-red-black-tree](https://github.com/make-github-pseudonymous-again/js-red-black-tree),
[@aureooms/js-splay-tree](https://github.com/make-github-pseudonymous-again/js-splay-tree),
and
[@aureooms/js-avl-tree](https://github.com/make-github-pseudonymous-again/js-avl-tree).

## :woman_teacher: Specification

### :balance_scale: Definition of a `Ternary Comparator`

We choose to parameterize trees using ternary comparator functions rather that
key functions (as is done in Python for instance).

    Comparator = ( x , x ) -> Number
    Key = ( x ) -> String

    compare( a , b ) < 0 <=> key( a ) < key( b )
    compare( a , b ) = 0 <=> key( a ) = key( b )
    compare( a , b ) > 0 <=> key( a ) > key( b )

#### Example of a `Ternary Comparator`

The following `Comparator` orders instances of `String`.

```js
const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
```

### Exposed tree constructors

No surprises here:

```js
const { from , empty } = SearchTree ;
```

### `empty(Comparator) -> SearchTree`

Create an empty search tree from a comparator function.

```js
let tree = empty( compare ) ;
```

### `from(Comparator, Iterable) -> Tree`

Create a search tree from a comparator function and an iterable.

```js
let tree = from( compare , 'abc' ) ;
```

### `Tree#length -> Number` (optional)

Returns the number of elements in the tree.

```js
if ( tree.length > 1 ) ...
```

### `Tree#isEmpty() -> Boolean`

Returns `true` if the tree is empty, `false` otherwise.

```js
return tree.isEmpty() ? 'empty' : 'not empty' ;
```

### `Tree#has(x) -> Boolean`

Returns `true` if the tree contains given element.

```js
if (tree.has(x)) ...
```

### Insertion

#### `Tree#insert(x) -> Reference`

Insert given element in the tree and returns optional reference.

```js
tree.insert('abc');
```

Could also be called `Tree#add` instead.

### Update

#### `Tree#update(x) -> Reference`

Update given element in the tree and returns optional reference.

```js
tree.insert({key: 'abc', value: 0});
tree.update({key: 'abc', value: 123});
```

### Removal

#### `Tree#removeFirst(x) -> Boolean`

Remove first occurrence of element. Returns optional boolean indicating if an
element was removed.

```js
tree.insert('x');
tree.insert('x');
tree.removeFirst('x');
```

#### `Tree#removeLast(x) -> Boolean`

Remove last occurrence of element. Returns optional boolean indicating if an
element was removed.

```js
tree.insert('x');
tree.insert('x');
tree.removeLast('x');
```

#### `Tree#removeAll(x) -> Boolean`

Remove all occurrences of element. Returns optional boolean indicating if an
element was removed.

```js
tree.insert('x');
tree.insert('x');
tree.removeAll('x');
```

#### `Tree#remove(x) -> Boolean`

Alias for `Tree#removeFirst`.

#### `Tree#delete(ref)`

Remove element given reference.

```js
let ref = tree.insert('abc');
tree.delete(ref);
```

Could also be called `Tree#unlink` instead. Leaving `Tree#delete` as an alias
for `Tree#removeFirst` or `Tree#removeAll` to mimic the `Set` API.

### Searching

#### `Tree#find(x) -> x`

#### `Tree#predecessor(x) -> x`

#### `Tree#successor(x) -> x`

#### `Tree#leftMost() -> x`

#### `Tree#rightMost() -> x`

### Merging

#### `Tree#meld(other)`

Merge two trees. Merged trees are destroyed.

```js
let a = from(compare, 'abc');
let b = from(compare, '123');
a.meld(b);
```

### Split

#### `Tree#split(x) -> [Tree, x, Tree]`

Split a tree at `x` such that

```js
const [left, key, right] = tree.split(x);
assert(compare(key, x) === 0);
assert(isBinarySearchTree({key, left, right}));
```

### Visit

#### `Tree#[Symbol.iterator]() -> Iterator`

#### `Tree#items() -> Iterator`

Alias for `Tree#[Symbol.iterator]()`.

#### `Tree#reversed() -> Iterator`

#### `Tree#rangeIE(left, right) -> Iterator`

#### `Tree#rangeII(left, right) -> Iterator`

#### `Tree#rangeEI(left, right) -> Iterator`

#### `Tree#rangeEE(left, right) -> Iterator`

#### `Tree#range(left, right) -> Iterator`

Alias for `Tree#rangeIE(left, right) -> Iterator`.
