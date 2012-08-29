
var data = ['a', 'b', 'c'];

exports.getWidget = function(feather, cb) {
  cb(null, {
    name: "training.sayHello",
    path: "widgets/sayHello/",

    prototype: {

      doSomething: feather.Widget.serverMethod(function(index, _cb) {

        _cb(null, data[index]);
      })
    }
  });
};