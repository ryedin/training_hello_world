var _ = require('underscore');

var states = {
  WI: "Wisconsin",
  AL: "Alabama",
  WA: "Washington"
};

function getStates(cb) {

  //simulate asyncrony via process.nextTick()
  process.nextTick(function() {

    var mappedStates = _.map(_.keys(states), function(abbrv) {
      return {
        name: states[abbrv],
        abbrv: abbrv
      };
    });

    cb(null, mappedStates);

  });

}

exports.getWidget = function(feather, cb) {
  
  //simulate fetching states from a database
  getStates(function(err, mappedStates) {

    cb(null, {
      name: "training.wizard",
      path: "widgets/wizard/",

      prototype: {

        onInit: function() {

          //set states on the widget so the template can see the data
          this.mappedStates = mappedStates; 
        }
      }
    });

  });  
};