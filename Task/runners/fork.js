const fork = (f, g) => sourceTask => {
  let clean;
  let end = false;
  const clearResources = () => {
    if (typeof clean === 'function' && !end) {
      clean();
      end = true;
    }
  };
  clean = sourceTask(
    (err) => {
      clearResources();
      return f(err);
    },
    (val) => {
      clearResources();
      return g(val);
    }
  );
  return clearResources;
};

module.exports = fork;
