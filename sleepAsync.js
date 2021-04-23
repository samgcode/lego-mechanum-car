async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = async function(fn, time, ...args) {
    await timeout(time)
    return fn(...args)
}
