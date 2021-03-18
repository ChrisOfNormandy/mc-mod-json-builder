const queue = require('./queue');

module.exports = (path, fileName, str) => {
    const data = {
        path, fileName, str
    };
    let fullPath = `${path}/${fileName}`;

    if (queue.has(fullPath))
        queue.get(fullPath).push(data);
    else
        queue.set(fullPath, [data]);
}