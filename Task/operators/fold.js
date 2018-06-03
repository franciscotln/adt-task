const fold = (f, g) => sourceTask => (rej, res) => sourceTask(a => res(f(a)), b => res(g(b)));

module.exports = fold;
