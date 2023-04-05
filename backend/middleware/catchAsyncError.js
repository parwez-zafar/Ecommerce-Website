module.exports = cathcAsyncError => (req, res, next) => {
    Promise.resolve(cathcAsyncError(req, res, next)).catch(next);
}