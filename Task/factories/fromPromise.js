const fromPromise = prom => (rej, res) => {
  let done = false;
  const guard = f => x => {
    if (!done) return f(x);
  };
  prom.then(guard(res), guard(rej));
  return () => {
    done = true;
  };
};

module.exports = fromPromise;
