:mag: [@aureooms/js-search-tree-spec](https://aureooms.github.io/js-search-tree-spec)
==

Search tree specification for JavaScript.
See [docs](https://aureooms.github.io/js-search-tree-spec).
Parent is [@aureooms/js-bst](https://github.com/aureooms/js-bst).

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

[![License](https://img.shields.io/github/license/aureooms/js-search-tree-spec.svg)](https://raw.githubusercontent.com/aureooms/js-search-tree-spec/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@aureooms/js-search-tree-spec.svg)](https://www.npmjs.org/package/@aureooms/js-search-tree-spec)
[![Build](https://img.shields.io/travis/aureooms/js-search-tree-spec/main.svg)](https://travis-ci.org/aureooms/js-search-tree-spec/branches)
[![Dependencies](https://img.shields.io/david/aureooms/js-search-tree-spec.svg)](https://david-dm.org/aureooms/js-search-tree-spec)
[![Dev dependencies](https://img.shields.io/david/dev/aureooms/js-search-tree-spec.svg)](https://david-dm.org/aureooms/js-search-tree-spec?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/js-search-tree-spec.svg)](https://github.com/aureooms/js-search-tree-spec/issues)
[![Downloads](https://img.shields.io/npm/dm/@aureooms/js-search-tree-spec.svg)](https://www.npmjs.org/package/@aureooms/js-search-tree-spec)

[![Code issues](https://img.shields.io/codeclimate/issues/aureooms/js-search-tree-spec.svg)](https://codeclimate.com/github/aureooms/js-search-tree-spec/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/aureooms/js-search-tree-spec.svg)](https://codeclimate.com/github/aureooms/js-search-tree-spec/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/aureooms/js-search-tree-spec/main.svg)](https://codecov.io/gh/aureooms/js-search-tree-spec)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/aureooms/js-search-tree-spec.svg)](https://codeclimate.com/github/aureooms/js-search-tree-spec/trends/technical_debt)
[![Documentation](https://aureooms.github.io/js-search-tree-spec//badge.svg)](https://aureooms.github.io/js-search-tree-spec//source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@aureooms/js-search-tree-spec)](https://bundlephobia.com/result?p=@aureooms/js-search-tree-spec)

## Description

This package contains a specification test suite for search tree
implementations such as
[@aureooms/js-red-black-tree](https://github.com/aureooms/js-red-black-tree),
[@aureooms/js-splay-tree](https://github.com/aureooms/js-splay-tree),
and
[@aureooms/js-avl-tree](https://github.com/aureooms/js-avl-tree).
