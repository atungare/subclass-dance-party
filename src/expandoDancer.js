var ExpandoDancer = function(top, left, timeBetweenSteps){

  Dancer.call(this, top, left, timeBetweenSteps);
  this._count = 0;

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
};

ExpandoDancer.prototype = Object.create(Dancer.prototype);
ExpandoDancer.prototype.constructor = ExpandoDancer;

ExpandoDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  if(this._count % 2 === 0) {
    this.$node.css({"border":"20px solid green"});
  } else {
    this.$node.css({"border":"10px solid green"});
  }
  this._count++;
};


