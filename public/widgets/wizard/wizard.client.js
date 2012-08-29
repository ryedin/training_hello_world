feather.ns("training");
(function() {
  training.wizard = feather.Widget.create({
    name: "training.wizard",
    path: "widgets/wizard/",
    prototype: {

      onInit: function() {
      },

      onReady: function() {
        var me = this;

        //wire up a finite state machine to control UI based on wizard state
        me.fsm = new feather.FiniteStateMachine({
          states: {
            initial: {
              stateStartup: function() {
                //render step 1
                $.tmpl(me.templates.step1, me).appendTo(me.get('#steps'));

                //make sure the form is datalinked
                me.datalink();

                //no prev steps so disable back button
                me.get('#backBtn')[0].disabled = true;
              },

              leavingState: function() {
                //re-enable back button
                me.get('#backBtn')[0].disabled = false;
              },

              forward: function() {
                return this.states.step2;
              }
            },

            step2: {
              stateStartup: function() {
                //render step 2
                $.tmpl(me.templates.step2, me).appendTo(me.get('#steps'));

                //make sure the form is datalinked
                me.datalink();
              },

              forward: function() {
                return this.states.step3;
              },

              back: function() {
                return this.states.initial;
              }
            },

            step3: {
              stateStartup: function() {
                //render step 3
                $.tmpl(me.templates.step3, me).appendTo(me.get('#steps'));

                //no forward steps so disable forward button
                me.get('#forwardBtn')[0].disabled = true;
              },

              leavingState: function() {
                //re-enable forward button
                me.get('#forwardBtn')[0].disabled = false;
              },

              back: function() {
                return this.states.step2;
              }
            },

            global: {
              leavingState: function() {
                me.get('#steps').empty();
              }
            }
          }
        });

        //wire listeners to the forward and back button to control FSM state
        me.domEvents.bind(me.get('#forwardBtn'), 'click', function() {
          //just fire an event on the FSM
          me.fsm.fire('forward');
        });

        me.domEvents.bind(me.get('#backBtn'), 'click', function() {
          //just fire an event on the FSM
          me.fsm.fire('back');
        });
      }
    }
  });
})();