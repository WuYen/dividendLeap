function Manager() {
  let jobQueue = [];
  let counter = 0;
  let stopped = true;

  const batchSize = 10;

  async function DoJob() {
    if (stopped) {
      return;
    }
    let tasks = [];
    let idx = 0;
    let jobLength = Math.min(batchSize, jobQueue.length);
    let t1 = +new Date();
    console.log(`run job [start] length:${jobLength}, total:${jobQueue.length}`);
    while (idx < jobLength) {
      var { stockNo, res } = jobQueue[idx];
      tasks.push(
        fetch("https://jsonplaceholder.typicode.com/todos/1")
          .then((response) => response.json())
          .then((data) => res(data))
      );
      idx++;
    }
    jobQueue.splice(0, jobLength);
    await Promise.all([
      ...tasks,
      new Promise((res, rej) => {
        setTimeout(() => {
          res();
        }, batchSize * 1000);
      }),
    ]);
    let t2 = +new Date();
    console.log(`run job [finish] remain:${jobQueue.length}`, t2 - t1);
    counter = 0;
    !stopped && DoJob();
  }

  function addJob(stockNo, callBack = null) {
    //第一次進queue的要能插隊 => 第一次 queue裡面沒有stockNo的就是第一次
    console.log("add job", `counter:${counter}`, stockNo);

    let job =
      counter < batchSize
        ? fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => res.json())
        : new Promise((res, rej) => {
            jobQueue.push({ stockNo, res });
          });

    counter++;

    return callBack ? job.then(callBack) : job;
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
