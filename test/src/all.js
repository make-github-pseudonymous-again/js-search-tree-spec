// eslint-disable-next-line ava/use-test
import ava from 'ava';
import spec from '../../src';

spec.test(ava, [
	{
		name: 'DummySearchTree',
		empty: (compare) => new spec.DummySearchTree(compare),
		from: spec.DummySearchTree.from
	}
]);

spec.test(
	ava,
	{
		name: 'DummySearchTree',
		empty: (compare) => new spec.DummySearchTree(compare),
		from: spec.DummySearchTree.from
	},
	{
		length: true, // Do the implementations maintain a `length` property?
		lengths: 300 // Tree sizes to test.
	}
);
