const delayed =
  typeof setImmediate !== 'undefined' ? setImmediate : typeof process !== 'undefined' ? process.nextTick : setTimeout;

const concat = inputTask => sourceTask => (rej, res) => {
  let done = false;
  let cleanSource;
  let cleanInput;

  const cleanBoth = () => {
    if (typeof cleanSource === 'function') cleanSource();
    if (typeof cleanInput === 'function') cleanInput();
  };

  const guard = f => x => {
    if (!done) {
      done = true;
      delayed(cleanBoth);
      return f(x);
    };
  };

  const guardedRej = guard(rej);
  const guardedRes = guard(res);

  cleanSource = sourceTask(guardedRej, guardedRes);
  cleanInput = inputTask(guardedRej, guardedRes);

  return cleanBoth;
};

module.exports = concat;
