const swap = () => sourceTask => (rej, res) => sourceTask(res, rej);

module.exports = swap;
