const cata = ({ Rejected, Resolved }) => sourceTask => {
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
      return Rejected(err);
    },
    (val) => {
      clearResources();
      return Resolved(val);
    }
  );
  return clearResources;
}
module.exports = cata;
