angular.module('starter.services', [])

.factory('SurveysService', function(StoreService) {

  var _surveys = function(value) {
    if (value != null) {
      return StoreService.surveys(value);
    } else {
      return StoreService.surveys() || StoreService.surveys([]);
    }
  };

  var all = function() {
    return _surveys()
  };

  var get = function(surveyIndex) {
    return _surveys()[parseInt(surveyIndex)]
  }

  var save = function(newSurvey) {
    surveys = _surveys()
    surveys.push(newSurvey)
    return _surveys(surveys)
  };

  var count = function() {
    var surveys = _surveys()
    return surveys.length
  }

  var avgRating = function() {
    var surveys = _surveys()
    if (surveys.length > 0) {
      var sumOfRatings = 0;
      angular.forEach(surveys, function(survey){
        sumOfRatings += survey.rating
      });
      return (sumOfRatings/count()).toFixed(2)
    } else {
      return 0;
    }
  }

  var avgResearched = function() {
    var surveys = _surveys()
    if (surveys.length > 0) {
      var sumOfResearched = 0;
      angular.forEach(surveys, function(survey){
        sumOfResearched += survey.research
      });
      return (sumOfResearched/count()).toFixed(2)
    } else {
      return 0;
    }
  }

  var percentResearched = function() {
    return avgResearched() * 100;
  }

  return {
    all: all,
    get: get,
    save: save,
    count: count,
    avgRating: avgRating,
    percentResearched: percentResearched
  };

})

.factory('StoreService', function($window, $rootScope) {
  storageAccessor = function(storage, key) {
    return function(value) {
      var valJson;
      if (value != null) {
        storage.setItem(key, JSON.stringify(value));
        valJson = storage.getItem(key);
        return JSON.parse(valJson);
      } else if (value === null) {
        return storage.removeItem(key);
      } else {
        valJson = storage.getItem(key);
        return (valJson != null) && JSON.parse(valJson);
      }
    };
  };

  persistentAccessor = function(key) {
    return storageAccessor($window.localStorage, key);
  };

  return {
    surveys: persistentAccessor('surveys'),
  };

});

