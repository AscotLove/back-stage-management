ReactComponent.prototype.setState = function(partialState, callback) {
  invariant(
    typeof partialState === 'object' ||
    typeof partialState === 'function' ||
    partialState == null,
    'setState(...): takes an object of state variables to update or a' +
    'function which returns an object of state variables.',
  );
  let callbackPromise;
  if (!callback) {
    class Deferred {
      constructor() {
        this.promise = new Promise((resolve, reject) => {
          this.reject = reject;
          this.resolve = resolve;
        });
      }
    }
    callbackPromise = new Deferred();
    callback = () => {
      callbackPromise.resolve()
    }
  }
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
  if (callbackPromise) {
    return callbackPromise.promise;
}
}