import models from './config'

var env = "prod";

export default {

    setEnv: function (paramEnv = 'prod') {
        env = paramEnv;
    },

    get: function (modelName, params = {}) {

        if (env === "test") {
            modelName = "mock" + modelName.substr(0,1).toUpperCase() + modelName.substr(1);
        }

        if (models[modelName]) {
            var configParams = models[modelName].param,
                constructorParams;
                //constructorParams = $.extend({}, configParams, params);
          if(Object.keys(params).length === 0 && params.constructor === Object){
            constructorParams = configParams;
          } else {
            constructorParams = params;
          }

            var inst = Object.create(models[modelName].class.prototype);
            models[modelName].class.call(inst, constructorParams);
            return inst;
        } else {
            throw Error ("can't load model " + modelName);
        }
    }
}