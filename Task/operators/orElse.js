const orElse = f => sourceTask => (rej, res) => sourceTask(a => f(a)(rej, res), res);

module.exports = orElse;
