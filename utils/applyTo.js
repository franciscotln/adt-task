const applyTo = v0 => (...fns) => {
  if (fns.length === 0) return v0;
  let v = v0;
  for (f of fns) v = f(v);
  return v;
};

module.exports = applyTo;
