feather.ns("training");
(function() {
  training.coolStuff = feather.Widget.create({
    name: "training.coolStuff",
    path: "widgets/coolStuff/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;

        me.domEvents.bind(me.get('#sayHiBtn'), 'click', function() {

          // dynamically load a widget from the server
          var sayHello;
          feather.Widget.load({
            path: 'widgets/sayHello/',
            clientOptions: {
              containerOptions: {
                title: 'Weeee',
                width: 500,
                height: 600,
                modal: true,
                buttons: {
                  SAVE: function() {
                    feather.alert('Save', 'Your data has been saved');
                    sayHello.dispose();
                  },
                  Cancel: function() {
                    feather.confirm('Leaving so soon?', 'Are you sure you want to cancel?', function() {
                      sayHello.dispose();
                    });                    
                  }
                }
              },

              onceState: {
                ready: function() {
                  sayHello = this;
                  alert('I am custom onReady code');
                }
              },

              on: {
                customEvent: function(arg1, arg2) {
                  feather.alert(arg1, arg2);
                }
              },

              once: {
                disposed: function() {
                  feather.alert('Disposed', 'The widget has left the building');
                }
              }
            }
          });
        });

        me.domEvents.bind(me.get('#wizardBtn'), 'click', function() {

          // dynamically load a widget from the server
          feather.Widget.load({
            path: 'widgets/wizard/',
            clientOptions: {
              container: me.get('#wizardContainer')
            }
          })
        });
      }
    }
  });
})();