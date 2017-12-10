var keyScrap = angular.module('keyScrap', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // when landing on the page, get all keywords and show them
  $http.get('/list')
  .success(function(data) {
    console.log(data);
    $scope.keywords = data;

  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  // when submitting the add form, send the text to the node API
  $scope.createKeyword = function() {
    console.log($scope.formData)
    $http.post('/scrap', $scope.formData)
    .success(function(data) {
      $scope.formData = {}; // clear the form so our user is ready to enter another
      $scope.keywords = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };
}
