const rejectedMap = f => sourceTask => (rej, res) => sourceTask(a => rej(f(a)), res);

module.exports = rejectedMap;
