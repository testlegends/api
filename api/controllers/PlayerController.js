
module.exports = (function () {

    function index (req, res) {
        return res.json({
            name: 'Jeff Lee',
            lvl: 100
        });
    }

    return {
        index: index,
        _config: {}
    };

})();
