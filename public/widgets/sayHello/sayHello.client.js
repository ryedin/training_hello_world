feather.ns("training");
(function() {
  training.sayHello = feather.Widget.create({
    name: "training.sayHello",
    path: "widgets/sayHello/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;
        
        me.domEvents.bind(me.get('#sayHiBtn'), 'click', function() {

          var array = [];
          var end = new feather.Semaphore(function() {
            alert(JSON.stringify(array));
          });

          _.each([0,1,2], function(index) {
            end.increment();
            me.server_doSomething([index], function(args) {
              array.push(args.result);
              end.execute();
            });
          });

          //fire a custom event with data
          //me.fire('customEvent', me.model.something.arg1, me.model.something.arg2);
        });
      }
    }
  });
})();