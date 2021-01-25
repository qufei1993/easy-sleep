# Welcome to easy-sleep ⏱️

Add sleep(), usleep() to Node.js, via a C/C++ addons with N-API. implementation true event-loop blocking sleep.

## Install using NPM

```
npm install system-sleep -S
```

## Usage

### Async sleep

implementation based on Promise + setTimeout combination.

```js
const { sleep } = require('easy-sleep');

async function test() {
  console.log(1);
  await sleep(3000); // 3000 ms delay
  console.log(2); // Output 2 after about 3000 milliseconds
}
```

### Thread sleep

true event-loop blocking sleep. use caution in the main thread.

* Thread.sleep(n): sleep for n miliseconds
* Thread.usleep(n): sleep for n microseconds (1 second is 1000000 microseconds)
* Thread.wait(n): implementation based on Atomics.wait (Support Node.js v8.10.0+)

```js
const { Thread } = require('easy-sleep');
Thread.sleep();
```

You can use in worker thread.

```js
// app.js
const { Worker } = require('worker_threads');
const list = ['A', 'B', 'C', 'D'];
for (const item of list) {
  const worker = new Worker('./worker.js');
  worker.on('message', msg => {
    console.log(`main thread callback message: ${msg}`);
    worker.terminate()
  });
  worker.postMessage(item);
}
```

```js
// worker.js
const { parentPort, threadId } = require('worker_threads');
const { Thread } = require('easy-sleep');

parentPort.on('message', async data => {
  console.log(`worker thread(${threadId}) receive message: ${JSON.stringify(data)}`);
  Thread.sleep(3000 + threadId * 1000);
  parentPort.postMessage(`worker(${threadId})`);
});
```
