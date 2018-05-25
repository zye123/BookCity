var homeDate = require('./home/home.json');
var list1 = require('./home/recommend1.json');
var list2 = require('./home/recommend2.json');
var list3 = require('./home/recommend3.json');
var search = require('./search/data.json');
var clear = require('./search/search.json');
var detail = require('./detail/352876.json');
var read1 = require('./reader/data1.json');
var read2 = require('./reader/data2.json');
var read3 = require('./reader/data3.json');
var read4 = require('./reader/data4.json');
var menulist = require('./reader/menu.json');
var mockDate = {
    '/book/detail?activeid=352876': detail,
    '/book/index': homeDate,
    '/book/list?pagenum=1&limit=10': list1,
    '/book/list?pagenum=2&limit=10': list2,
    '/book/list?pagenum=3&limit=10': list3,
    '/book/page1': search,
    '/book/search': clear,
    '/book/reader-list?article=1': read1,
    '/book/reader-list?article=2': read2,
    '/book/reader-list?article=3': read3,
    '/book/reader-list?article=4': read4,
    '/book/menu': menulist
};
module.exports = function(url) {
    if (/\/book\/search?/.test(url)) {
        url = '/book/search';
    }
    return mockDate[url];
}