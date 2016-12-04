angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.link = {};

  $scope.addLink = function() {
    $scope.loading = true;
    Links.addLink($scope.link)
    .then(function() {
      $scope.message = 'successfully added url: ' + $scope.link.url;
      $scope.loading = false;
      $scope.link.url = '';
      $location.path('/links');
    });
  };

});
