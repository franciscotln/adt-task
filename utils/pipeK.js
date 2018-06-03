const pipeK = (...fns) => v0 => {
  const [head, ...tail] = fns;
  let v = head(v0);
  for (const f of tail) {
    const source = v;
    v = (rej, res) => source(rej, b => f(b)(rej, res));
  }
  return v;
};

module.exports = pipeK;
