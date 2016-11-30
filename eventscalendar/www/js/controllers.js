angular.module('starter.controllers', [])
angular.module('starter.controllers', ['starter.services'])
angular.module('starter.controllers', ['starter.services', 'ngOpenFB'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, ngFB, UserService, $state) {
    if ($scope.user != null) {
        $scope.portrait = { show : true };
    } else {
        $scope.portrait = { show : false };
        $state.go('app.login');
    }
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.user = { id : 0, name : "thisshitworks" };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

    $scope.fbLogin = function () {
        ngFB.login({scope: 'email,public_profile'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                //saves scope .. Not working?
                $scope.fbSave();
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
    };
    
    
    $scope.fbSave = function () {
        ngFB.api({
            path: '/me',
            params: {fields: 'id,name'}
        })
        .then(function (user) {
            UserService.setUser(user);
            $scope.user = user;
            
            if ($scope.user != null) {
                $scope.portrait = { show : true };
            } else {
                $scope.portrait = { show : false };
            }
        })
    };
})

.controller('LoginCtrl', function($scope, $ionicModal, $timeout, ngFB, UserService, $state,$ionicHistory) {
      // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $ionicHistory.nextViewOptions({
    disableBack:true
    });

    $state.go('app.events');
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

    $scope.fbLogin = function () {
        ngFB.login({scope: 'email,public_profile'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                //saves scope .. Not working?
                $scope.fbSave();
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
    };
    
    
    $scope.fbSave = function () {
        ngFB.api({
            path: '/me',
            params: {fields: 'id,name'}
        })
        .then(function (user) {
            UserService.setUser(user);
            $scope.user.id = user.id;
            $scope.user.name = user.name;
            if ($scope.user != null) {
                console.log('user id: ' + user.id);
                $scope.portrait.show = true;
            } else {
                $scope.portrait.show = false;
            }
        })
    };
})

//profile picture
.controller('ProfileCtrl', function ($scope, ngFB) {
    ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
        function (user) {
            $scope.user = user;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        });
})


.controller('SessionsCtrl', function($scope, Session) {
    $scope.sessions = Session.query();
})


.controller('SessionCtrl', function($scope, $stateParams, Session) {
    $scope.session = Session.get({sessionId: $stateParams.sessionId});
})

.controller('EventsCtrl', function($scope, Event) {
    'use strict';
    $scope.calendar = {};
    $scope.changeMode = function (mode) {
        $scope.calendar.mode = mode;
    };
    
    $scope.calendar.eventSource = createRandomEvents();

    $scope.onEventSelected = function (event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    };

    $scope.onViewTitleChanged = function (title) {
        $scope.viewTitle = title;
    };

    $scope.today = function () {
        $scope.calendar.currentDate = new Date();
    };

    $scope.isToday = function () {
        var today = new Date(),
            currentCalendarDate = new Date($scope.calendar.currentDate);

        today.setHours(0, 0, 0, 0);
        currentCalendarDate.setHours(0, 0, 0, 0);
        return today.getTime() === currentCalendarDate.getTime();
    };

    $scope.onTimeSelected = function (selectedTime, events) {
        console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0));
    };

    function createRandomEvents()
    {
    	var token = "691457421027471|xP7RzSR3WwN1czNby76cWKNi83M";
    	var events = [];

        // Get and parse list of upcoming events
        $.getJSON("https://graph.facebook.com/1662573647292892/events?access_token="+token+"&callback=?",function(json)
        {
            angular.forEach(json.data, function(value, key)
            {
                var cleanString = value.start_time.replace(/[T]/g, " ");
                var date = new Date(cleanString); 
                var endtime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1, date.getMinutes(), date.getSeconds());
                
                    events.push({
                        title: value.name,
                        startTime: date,
                        endTime: endtime,
                        allDay: false
                    });
            });
        });
        return events;
    }
})

.controller('EventCtrl', function($scope, $stateParams, Event) {
    $scope.event = Event.get({eventId: $stateParams.eventId});
})

.controller('NewsCtrl', function($scope) {
    $scope.news = [
        {id:0 , title:"More Pictures", author:"Jessica Porter", date:"10/31/2016", time:"9:40am", location:"", description: "More pictures from our event with @boomboxbody! If you didn't get a chance to join us this time, stay tuned for future events we host with this great startup as well as the ladies events we host through our group. (Ladies - search togetHERout on Facebook for our closed group!)"},
        {id:1 , title:"BoomBox Body Teamup", author:"Bruce Banner", date:"12/20/2016", time:"10:10am", location:"", description: "Our partnered event was a success! Excited to bring everyone more amazing events in the future. #Repost @boomboxbody with @repostapp The @boomboxbody and @togetherout Camel's Back workout was a huge success!! We would like to thank all the partners who made this possible. @bodybuildingcom @killerwhey @meriwethercider @neckarcoffee @superfoodathlete @proofeyewear"},
        {id:2 , title:"Sneak Peek", author:"Jessica Porter", date:"11/01/2016", time:"11:10am", location:"", description: "Here's a sneak peek of what's coming soon! Introducing togetHERout sports bras made by cofounder Lindsey Walters. Because these are handmade in Boulder, Colorado, we would love your feedback! How many of you girls are interested in purchasing togetHERout sports bras? Leave us some love in the comment section below 🙂 more designs to come!"},
        {id:3 , title:"Who wants a free shaker", author:"Jessica Porter", date:"11/01/2016", time:"3:10Pm", location:"", description: "www.facebook.com/groups/726599160796457/permalink/978234785632892/ So, who wants a free shaker?!! 🙋Venmo BoomBoxBody and let us know that you're coming to the event - first 40 people to pay get one! 😎"},
        {id:4 , title:"Powderhaus Brewing", author:"Jessica Porter", date:"11/01/2016", time:"2:00pm", location:"", description: "One of our new vendors for the event this Saturday!! 😍🙌🏼🍻#Repost @boomboxbody with @repostapp Sometimes it all just works out. @powderhausbrewing will donate 10 free beer tokens for the @togetherout and @boomboxbody raffle this Saturday. Click on the link in the @boomboxbody profile to sign up. "}
    ];
})

.controller('loginTemp', function($scope, News) {
    
})

.controller('NewsArticleCtrl', function($scope, $stateParams) {
    if ($stateParams.newsarticleId == 0) {
        $scope.newsarticle = {id:0 , title:"More Pictures", author:"Jessica Porter", date:"10/31/2016", time:"9:40am", location:"", description: "More pictures from our event with @boomboxbody! If you didn't get a chance to join us this time, stay tuned for future events we host with this great startup as well as the ladies events we host through our group. (Ladies - search togetHERout on Facebook for our closed group!)"};
    } else if ($stateParams.newsarticleId == 1) {
        $scope.newsarticle = {id:1 , title:"BoomBox Body Teamup", author:"Jessica Porter", date:"12/20/2016", time:"10:10am", location:"", description: "Our partnered event was a success! Excited to bring everyone more amazing events in the future. #Repost @boomboxbody with @repostapp The @boomboxbody and @togetherout Camel's Back workout was a huge success!! We would like to thank all the partners who made this possible. @bodybuildingcom @killerwhey @meriwethercider @neckarcoffee @superfoodathlete @proofeyewear"};
    } else if ($stateParams.newsarticleId == 2) {
        $scope.newsarticle = {id:2 , title:"Sneak Peek", author:"Jessica Porter", date:"11/01/2016", time:"11:10am", location:"", description: "Here's a sneak peek of what's coming soon! Introducing togetHERout sports bras made by cofounder Lindsey Walters. Because these are handmade in Boulder, Colorado, we would love your feedback! How many of you girls are interested in purchasing togetHERout sports bras? Leave us some love in the comment section below 🙂 more designs to come!"};
    } else if ($stateParams.newsarticleId == 3) {
        $scope.newsarticle = {id:3 , title:"Who wants a free shaker", author:"Jessica Porter", date:"11/01/2016", time:"3:10Pm", location:"", description: "www.facebook.com/groups/726599160796457/permalink/978234785632892/ So, who wants a free shaker?!! 🙋Venmo BoomBoxBody and let us know that you're coming to the event - first 40 people to pay get one! 😎"};
    } else if ($stateParams.newsarticleId == 4) {
        $scope.newsarticle = {id:4 , title:"Powderhaus Brewing", author:"Jessica Porter", date:"11/01/2016", time:"2:00pm", location:"", description: "One of our new vendors for the event this Saturday!! 😍🙌🏼🍻#Repost @boomboxbody with @repostapp Sometimes it all just works out. @powderhausbrewing will donate 10 free beer tokens for the @togetherout and @boomboxbody raffle this Saturday. Click on the link in the @boomboxbody profile to sign up. "};
    }
});
