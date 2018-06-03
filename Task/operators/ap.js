const delayed =
  typeof setImmediate !== 'undefined' ? setImmediate : typeof process !== 'undefined' ? process.nextTick : setTimeout;

const ap = inputTask => sourceTask => (rej, res) => {
  let func, funcLoaded = false;
  let val, valLoaded = false;
  let rejected = false;
  let cleanSource;
  let cleanInput;

  const cleanBoth = () => {
    if (typeof cleanSource === 'function') cleanSource();
    if (typeof cleanInput === 'function') cleanInput();
  };

  const guardResolve = setter => x => {
    if (rejected) return;
    setter(x);
    if (funcLoaded && valLoaded) {
      delayed(cleanBoth);
      return res(func(val));
    }
    return x;
  };

  const guardReject = x => {
    if (!rejected) {
      rejected = true;
      return rej(x);
    }
  };

  cleanSource = sourceTask(guardReject, guardResolve((x) => {
    funcLoaded = true;
    func = x;
  }));
  cleanInput = inputTask(guardReject, guardResolve((x) => {
    valLoaded = true;
    val = x;
  }));

  return cleanBoth;
};

module.exports = ap;
