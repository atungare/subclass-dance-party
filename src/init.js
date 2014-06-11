$(document).ready(function(){
  window.dancers = [];

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];
    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  });

  $(".lineUpButton").on("click", function () {
    for(var i = 0; i < window.dancers.length; i++) {
      window.dancers[i].lineUp();
    }
  });

  $("body").on("mouseleave", ".dancer", function () {

    var myLeft = parseFloat($(this).css('left'));
    var myTop = parseFloat($(this).css('top'))
    var firstClosest;
    var firstDistance;
    var orig;


    for(var i = 0; i < window.dancers.length; i++) {
      var tup = window.dancers[i].getPosition();
      var diffLeft = myLeft - tup[1];
      var diffTop = myTop - tup[0];
      var pythag = Math.sqrt(diffLeft*diffLeft + diffTop * diffTop);

      if (pythag === 0){
        orig = window.dancers[i];
      } else if (!firstClosest){
        firstClosest =  window.dancers[i];
        firstDistance = pythag;
      } else if (pythag<firstDistance) {
        firstClosest =  window.dancers[i];
        firstDistance = pythag;
      }
    }

    var firstPosition = firstClosest.getPosition();

    console.dir(this);
    console.dir($(this));

   // $origNode.css({"left":firstPosition[0],"top":firstPosition[1]});
    orig.setPosition(firstPosition[0], firstPosition[1]);


    firstClosest.setPosition(myTop, myLeft);

  });



});

