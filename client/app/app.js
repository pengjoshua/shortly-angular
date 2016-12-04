angular.module('shortly', [
  'shortly.services',
  'shortly.links',
  'shortly.shorten',
  'shortly.auth',
  'ngRoute',
  'ui.router',
  'ngFx',
  'ngAnimate'
])
.config(function ($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
  // include $stateProvider, $urlRouterProvider

  $routeProvider
    .when('/', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/links', {
      templateUrl: 'app/links/links.html',
      controller: 'LinksController',
      authenticate: true
    })
    .when('/shorten', {
      templateUrl: 'app/shorten/shorten.html',
      controller: 'ShortenController',
      authenticate: true
    })
    .when('/logout', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .otherwise({ 
      redirectTo: '/links' 
    });

  // // Use ui-router

  // $urlRouterProvider.otherwise('/links');
  // $stateProvider
  //   .state('links', {
  //     templateUrl: 'apps/links/links.html',
  //     url: '/links',
  //     controller: 'LinksController'
  //   })
  //   .state('links.child', {
  //     template: '<h1>{{ name }}</h1>',
  //     url: '/child'
  //   })
  //   .state('shorten', {
  //     templateUrl: 'app/shorten/shorten.html',
  //     url: '/shorten',
  //     controller: 'ShortenController'
  //   })
  //   .state('/signin', {
  //     templateUrl: 'app/auth/signin.html',
  //     url: '/signin',
  //     controller: 'AuthController'
  //   })
  //   .state('/signup', {
  //     templateUrl: 'app/auth/signup.html',
  //     url: '/signup',
  //     controller: 'AuthController'
  //   })
  //   .state('/logout', {
  //     templateUrl: 'app/auth/signin.html',
  //     url: '/logout',
  //     controller: 'AuthController'
  //   });

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
  $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
})
.animation('.custom-fade', function() {
  return {
    leave: function(element, done) {
      TweenMax.to(element, 1, {opacity: 0, onComplete: done});
    }, 
    enter: function(element, done) {
      TweenMax.to(element, 1, {opacity: 1, onComplete: done});
    }
  };
});
