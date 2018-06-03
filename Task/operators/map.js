const map = f => sourceTask => (rej, res) => sourceTask(rej, b => res(f(b)));

module.exports = map;
