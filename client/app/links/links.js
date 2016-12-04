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
})
.directive('alert', function() {
  return function(scope, element, attr) {
    // element.on('click', function() {
    //   alert('clicked');
    // })
  };
})
.directive('shortenLink', function() {
  return {
    restrict: 'EA',
    templateUrl: 'app/directiveLinks.html',
    replace: true,
    scope: {
      source: '='
    },
    link: function(scope, element, attr) {
    }
  };
});
