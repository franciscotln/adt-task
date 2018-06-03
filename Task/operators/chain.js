const chain = f => sourceTask => (rej, res) => sourceTask(rej, b => f(b)(rej, res));

module.exports = chain;
