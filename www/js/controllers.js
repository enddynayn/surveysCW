angular.module('starter.controllers', [])

.controller('AdminCtrl', function($scope, SurveysService) {

  $scope.surveyCount = SurveysService.count();
  $scope.avgRating = SurveysService.avgRating();
  $scope.avgResearched = SurveysService.percentResearched();
})

.controller('AdminSurveysCtrl', function($scope, SurveysService) {

  $scope.surveys = SurveysService.all();
})

.controller('AdminSurveyDetailCtrl', function($scope, $stateParams, SurveysService) {

  $scope.survey = SurveysService.get($stateParams.surveyIndex);
})

.controller('SurveyCtrl', function($scope, $stateParams, $state, SurveysService) {

  $scope.survey = {}

  $scope.submitSurveyForm = function(form) {
    $scope.submitted = true;

    if (form.$invalid) {
      return;
    }

    var newSurvey = {
        rating: $scope.survey.rating,
        comments: $scope.survey.comments || 'no comment',
        research: $scope.survey.researchChoice,
      }

    SurveysService.save(newSurvey)

    $state.go('thank-you')
  }
});
