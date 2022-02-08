function Manager() {
  let jobQueue = [];
  let callCount = 0;
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
    //console.log(`run job [start] length:${jobLength}, total:${jobQueue.length}, callCount:${callCount}`);
    while (idx < jobLength) {
      if (callCount > 59) {
        jobLength = idx;
        console.log("exceed limit need break");
        break;
      }
      console.log(`    dequeue callCount:${callCount}`);
      let idxTemp = idx;
      tasks.push(
        fetch(jobQueue[idxTemp].url)
          .then((response) => response.json())
          .then((data) => {
            //console.log("resolve url", idxTemp, jobQueue[idxTemp], data);
            jobQueue[idxTemp].res(data);
          })
      );
      callCount++;
      idx++;
    }

    await Promise.all([
      ...tasks,
      new Promise((res, rej) => {
        setTimeout(() => {
          res();
        }, 2000);
      }),
    ]);
    jobQueue.splice(0, jobLength);
    let t2 = +new Date();
    console.log(`run job [finish] jobLength:${jobLength}, remain:${jobQueue.length}, callCount:${callCount}`, t2 - t1);
    !stopped && DoJob();
  }

  function addJob(url, callBack = null) {
    //第一次進queue的要能插隊 => 第一次 queue裡面沒有stockNo的就是第一次
    if (stopped) {
      return;
    }
    //console.log("add job", `counter:${counter}`, url);
    let job = new Promise((resolve, reject) => {
      //console.log("add to jobQueue", url);
      jobQueue.push({
        url,
        res: resolve,
      });
    });

    return callBack ? job.then(callBack) : job;
  }
  let intervalID;
  return {
    startRunning: () => {
      if (stopped) {
        console.log("start running");
        intervalID = setInterval(() => {
          console.log("call count", callCount);
          callCount = 0;
        }, 61000);
        stopped = false;
        DoJob();
      }
    },
    stopRunning: () => {
      console.log("stop running");
      stopped = true;
      clearInterval(intervalID);
    },
    addJob,
    removeJob: () => {},
  };
}

const manage = Manager();
window.manage = manage;

export default manage;
