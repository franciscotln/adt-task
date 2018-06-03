const bimap = (f, g) => sourceTask => (rej, res) => sourceTask(a => rej(f(a)), b => res(g(b)));

module.exports = bimap;
