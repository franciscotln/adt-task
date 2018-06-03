# adt-task

Function based Task algebraic data type for asynchronous computations

`npm install adt-task`

## Examples

### Crazy Kliesli composition
```js
const Task = require('adt-task/Task'); // require everything
const { map, fork, of, fromPromise, chain, rejected } = Task;
const { pipe, pipeK } = require('adt-task/utils'); // require all utility functions

pipe(
  map(x => x + 1),
  chain(pipeK(
    x => of(x + 2),
    x => of(x * 2),
    x => of(x - 10),
    x => fromPromise(Promise.resolve(x / 2)),
  )),
  fork(
    (e) => console.log('Error ', e),
    (v) => console.log('Value ', v) // Value -1
  )
)(fromPromise(Promise.resolve(1)));
```

### Cancelling a Task from promise
```js
const cancel = pipe(
  map(x => x + 1),
  fork(
    (e) => console.log('Error ', e),
    (v) => console.log('Value ', v) // void, gets cancelled.
  )
)(fromPromise(Promise.resolve(1)));

cancel();
```

### Creating and cancelling a Task with setTimeout
```js
const task = require('adt-task/Task/factories/task');
const map = require('adt-task/Task/operators/map');
const fork = require('adt-task/Task/operators/fork');
const pipe = require('adt-task/utils/pipe');

const myTask = task((rej, res) => {
  const id = setTimeout(() => res(1), 500);
  return () => clearTimeout(id); // Task returns a clean up function
});

const cancel = pipe(
  map(x => x + 1),
  fork(
    (e) => console.log('Error ', e),
    (v) => console.log('Value ', v) // void, gets cancelled.
  )
)(myTask);

cancel();
```

### Aplicative
```js
const of = require('adt-task/Task/factories/of');
const ap = require('adt-task/Task/operators/ap');
const fork = require('adt-task/Task/operators/fork');
const pipe = require('adt-task/utils/pipe');
const applyTo = require('adt-task/utils/applyTo');

const mAdd = of(a => b => a + b);

pipe(
  ap(of(1)),
  ap(of(2)),
  fork(
    x => console.log('Error ', x),
    y => console.log('Value ', y) // Value 3
  )
)(mAdd);

// Using the utility function "applyTo" instead of "pipe"
applyTo (mAdd) (
  ap(of(1)),
  ap(of(2)),
  fork(
    x => console.log('Error ', x),
    y => console.log('Value ', y) // Value 3
  )
);
```
