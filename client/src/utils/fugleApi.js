function Manager() {
  let fugleQueue = [];
  let counter = 0;
  let stopped = true;

  //fugleQueue.shift()
  //fugleQueue.push()
  const batchSize = 10;

  async function DoJob() {
    if (stopped) {
      return;
    }
    let task = [];
    let idx = 0;
    let jobLength = Math.min(batchSize, fugleQueue.length);
    console.log(`run job length:${jobLength}`);
    while (idx < jobLength) {
      var { stockNo, res } = fugleQueue[idx];
      console.log("do fetch", idx);
      let job = fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((data) => {
          res(data);
        });

      idx++;
      task.push(job);
    }
    fugleQueue.splice(0, jobLength);
    let finish = Promise.all([
      ...task,
      new Promise((res, rej) => {
        setTimeout(() => {
          res();
        }, batchSize * 1000);
      }),
    ]);
    console.log(`run job finish remain:${fugleQueue.length}`);
    await finish;
    counter = 0;
    !stopped && DoJob();
  }

  function addJob(stockNo, callBack) {
    //第一次進queue的要能插隊 => 第一次 queue裡面沒有stockNo的就是第一次
    console.log("add job", `counter:${counter}`, stockNo);
    if (counter < batchSize) {
      counter++;
      let job = fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => res.json());
      return callBack ? job.then(callBack) : job;
    } else {
      counter++;
      let job = new Promise((res, rej) => {
        fugleQueue.push({ stockNo, res });
      });

      return callBack ? job.then(callBack) : job;
    }
  }

  return {
    startRunning: () => {
      if (stopped) {
        stopped = false;
        DoJob();
      }
    },
    stopRunning: () => {
      stopped = true;
    },
    addJob,
    removeJob: () => {},
  };
}
