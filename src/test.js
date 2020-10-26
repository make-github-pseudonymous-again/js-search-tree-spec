import {increasing, decreasing} from '@aureooms/js-compare';
import {shuffle} from '@aureooms/js-random';
import {exhaust, list, map, product, chain} from '@aureooms/js-itertools';
import {star} from '@aureooms/js-functools';

/**
 * Tests the following methods:
 *
 *   - tree.insert( value )
 *   - tree.find( value )
 *   - tree.remove( value )
 *   - tree[@@iterator]()
 */

const macro = (t, {empty}, compare, n, length) => {
	let i;

	const tree = empty(compare);

	const a = [];
	i = n;

	while (i--) {
		const x = Math.random();
		tree.insert(x);
		a.push(x);
		if (length) t.is(tree.length, a.length);
	}

	a.sort(compare);

	const half = Math.floor(n / 2);

	// CHECK CONTENT
	const b = [...tree];
	t.deepEqual(b, a, 'check content');

	// PREPARE FOR CHECKING PURPOSES
	i = n;
	while (i--) {
		a[i] = [true, a[i]];
	}

	// CHECK FIND SORTED
	i = n;
	while (i--) {
		b[i] = tree.find(a[i][1]);
		if (length) t.is(tree.length, n);
	}

	t.deepEqual(b, a, 'check find sorted');

	// CHECK FIND SHUFFLED
	shuffle(a, 0, n);
	i = n;
	while (i--) {
		b[i] = tree.find(a[i][1]);
		if (length) t.is(tree.length, n);
	}

	t.deepEqual(b, a, 'check find shuffled');

	const remove = (l, r, p, q, txt) => {
		// REMOVE

		i = r;
		while (i-- > l) {
			tree.remove(a[i][1]);
			a[i][0] = false;
		}

		// CHECK CONTENT AFTER REMOVE

		const e = [];
		for (i = p; i < q; ++i) {
			e.push(a[i][1]);
		}

		e.sort(compare);
		const d = [...tree];
		t.deepEqual(d, e, 'check content ' + txt);

		// CHECK FIND AFTER REMOVE

		const c = [];
		i = n;
		while (i--) {
			b[i] = tree.find(a[i][1])[0];
			c[i] = a[i][0];
		}

		t.deepEqual(b, c, 'check find ' + txt);

		// TRY REMOVING TWICE

		i = r;
		while (i-- > l) {
			tree.remove(a[i][1]);
		}
	};

	remove(half, n, 0, half, 'after remove half');

	// ADD NEW ELEMENTS
	i = n;
	while (i-- > half) {
		const x = Math.random();
		tree.insert(x);
		a[i] = [true, x];
	}

	// CHECK CONTENT NEW ELEMENTS

	const e = [];
	for (i = 0; i < n; ++i) {
		e.push(a[i][1]);
	}

	e.sort(compare);
	const d = [...tree];
	t.deepEqual(d, e, 'check content new elements');

	// CHECK FIND NEW ELEMENTS

	i = n;

	while (i--) {
		b[i] = tree.find(a[i][1]);
	}

	t.deepEqual(b, a, 'check find new elements');

	remove(0, half, half, n, 'after remove first half');
	remove(half, n, 0, 0, 'after remove second half');

	t.is(tree.length, 0, 'tree is empty');
};

macro.title = (title, {name}, compare, n, length) =>
	`search tree (${name}, ${compare.name}, ${n}, length: ${length})`;

const DEFAULT_COMPARE_FUNCTIONS = [increasing, decreasing];
const DEFAULT_LENGTH_VALUES = [
	[1],
	[16],
	[17],
	[31],
	[32],
	[33],
	[127],
	[128],
	[129]
];
const DEFAULT_OPTIONS = {
	compare: DEFAULT_COMPARE_FUNCTIONS,
	lengths: DEFAULT_LENGTH_VALUES,
	length: false
};

const wrap = (l) => map((x) => [x], l[Symbol.iterator] === undefined ? [l] : l);

export default function test(_test, implementations, options) {
	options = Object.assign({}, DEFAULT_OPTIONS, options);
	exhaust(
		map((args) => {
			star((tree, compare, size, length) => {
				_test(macro, tree, compare, size, length);
			}, list(chain(args)));
		}, product([wrap(implementations), wrap(options.compare), wrap(options.lengths), wrap(options.length)], 1))
	);
}
