angular.module('starter', ['ionic', 'ionic.rating', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
  $stateProvider

  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  .state('tab.admin', {
    url: '/admin',
    views: {
      'tab-admin': {
        templateUrl: 'templates/tab-admin.html',
        controller: 'AdminCtrl'
      }
    }
  })

  .state('tab.surveys', {
    url: '/surveys',
    views: {
      'tab-surveys': {
        templateUrl: 'templates/tab-admin-surveys.html',
        controller: 'AdminSurveysCtrl'
      }
    }
  })

  .state('tab.survey-detail', {
    url: '/survey/:surveyIndex',
    views: {
      'tab-surveys': {
        templateUrl: 'templates/admin-survey-detail.html',
        controller: 'AdminSurveyDetailCtrl'
      }
    }
  })

  .state('survey', {
    url: '/survey',
    templateUrl: 'templates/survey.html',
    controller: 'SurveyCtrl',
  })

  .state('thank-you', {
    url: '/thank-you',
    templateUrl: 'templates/thank-you.html',
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/admin');

});
