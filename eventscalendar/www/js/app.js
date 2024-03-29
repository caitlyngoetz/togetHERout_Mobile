// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers'])
angular.module('starter', ['ionic', 'starter.controllers', 'ngOpenFB', 'ui.rCalendar'])

.run(function($ionicPlatform, ngFB) {
  ngFB.init({appId: '691457421027471'});
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
            templateUrl: 'templates/search.html'
          }
        }
    })

    .state('app.browse', {
        url: '/browse',
            views: {
            'menuContent': {
              templateUrl: 'templates/browse.html'
            }
        }
    })
    
    .state('app.profile', {
        url: "/profile",
        views: {
            'menuContent': {
                templateUrl: "templates/profile.html",
                controller: "ProfileCtrl"
            }
        }
    })
    
    .state('app.events', {
        url: "/events",
        views: {
        'menuContent': {
            templateUrl: "templates/events.html",
            controller: 'EventsCtrl'
        }
      }
    })

    .state('app.event', {
        url: "/event/:eventId",
        views: {
            'menuContent': {
                templateUrl: "templates/event.html",
                controller: 'EventCtrl'
            }
        }
    })
    
    .state('app.news', {
        url: "/news",
        views: {
        'menuContent': {
            templateUrl: "templates/news.html",
            controller: 'NewsCtrl'
        }
      }
    })

    .state('app.newsarticle', {
        url: "/news/:newsarticleId",
        views: {
            'menuContent': {
                templateUrl: "templates/newsarticle.html",
                controller: 'NewsArticleCtrl'
            }
        }
    })

    .state('app.preferences', {
	url: "/preferences",
	views: {
	    'menuContent': {
		templateUrl: "templates/preferences.html",
		controller: 'PreferencesCtrl'
	     }
	}
     })
    
    .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })
     .state('app.loginTemp', {
    url: '/loginTemp',
    views: {
      'menuContent': {
        templateUrl: 'templates/loginTemp.html',
        controller: 'loginTemp'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/loginTemp');
});
