angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links, Auth) {
  // Your code here
  $scope.data = {};

  $scope.getAll = function() {
    Links.getAll().then(function(links) {
      $scope.data.links = links;
    });
  };
  $scope.getAll();

  $scope.signout = function() {
    Auth.signout();
  };

});
