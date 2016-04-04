app.controller("HomeController", ["$scope", "$routeParams", "$interval", "GroceryService", "UserService", "IndexeddbService", function($scope, $routeParams, $interval, GroceryService, UserService, IndexeddbService){
	
	//Variables

	$scope.loginTitle = "Please Login for dance";

	$scope.groceryItems = GroceryService.groceryItems;
	$scope.offline = "";
	$scope.userAuthorised = true;
	$scope.userLoginError = true;
	

	angular.element('#addnewItem').focus()
	//check session if user is loged in 
	UserService.userSession();
	$scope.userAuthorised = UserService.authorised;

	$scope.removeItem = function(entry) {
		GroceryService.removeItem(entry);
	};
	$scope.markCompleted = function(entry){
		GroceryService.markCompleted(entry);
	};
	$scope.removeRemarkedItems = function(){
		GroceryService.removeRemarkedItems();
	}
	$scope.$watch(function(){return UserService.userLoginError;}, function(userLoginError){
			$scope.userLoginError = userLoginError;
			//alert($scope.userLoginError);
	});	
	$scope.$watch(function(){return GroceryService.groceryItems;}, function(groceryItems){
			$scope.groceryItems = groceryItems;
	});
	$scope.$watch(function(){return GroceryService.offline;}, function(offline){
			var themeColor;
			if (offline){
				$scope.offline = " - off line mode";
				themeColor = '#78909C';
			}else{
				$scope.offline = null;
				themeColor = '#FF7043';
			}
			$('meta[name=theme-color]').remove();
    		//add the new one
    		$('head').append('<meta name="theme-color" content="'+themeColor+'">');
	});
	$scope.intervalPromise = $interval(function(){
			GroceryService.reloadData();
			console.log("refreshed");
    }, 10000);  

	$scope.userlogin = function(entry){
		UserService.userLogin(entry, $scope.userAuthorised);
		$scope.userAuthorised = UserService.authorised;
		$scope.userAuthorised = true;
	};
	$scope.userlogout = function(){
		$scope.userAuthorised = UserService.userLogout();
		$scope.logoutButton = null;
	};


	//indexeddb tests
	//IndexeddbService.indexeddbSuported();
	//IndexeddbService.openDb();
	$scope.$watch(function(){return GroceryService.groceryItems;}, function(groceryItems){
		$scope.groceryItems = groceryItems;
		//IndexeddbService.syncronAllToDb($scope.groceryItems);
		//IndexeddbService.getItemsFromDB();
	});
	//
}]);

app.controller("MenuController", ["$scope", "$timeout", "$routeParams", "$interval", "GroceryService", "UserService", "IndexeddbService", function($scope, $timeout, $routeParams, $interval, GroceryService, UserService, IndexeddbService){
	//TODO delete $interval	
	$scope.menuClosed = true;
	$scope.displayOverlayControllerClass = 'displaynone';
	$scope.dysplayMenuControllerClass; 
		//Functions
	$scope.menuToggle = function(){
		var overlayElement = angular.element('#menuOverlay')[0];
		if($scope.menuClosed){
			$scope.menuClosed = false;
			$scope.dysplayMenuControllerClass = 'menulist-display';
 			overlayElement.style.display = 'block'; 
 			$timeout( function(){ $scope.displayOverlayControllerClass = '';	}, 200);
    		
    		
		}else{
			$scope.menuClosed = true;
			$scope.displayOverlayControllerClass = 'displaynone';
			$timeout( function(){ overlayElement.style.display = 'none'; }, 500);
			$scope.dysplayMenuControllerClass = '';
		}
	}

}]);


app.controller("GroceryListItemsController", ["$scope", "$routeParams", "$location", "GroceryService", function($scope, $routeParams, $location, GroceryService){
	$scope.groceryItems = GroceryService.groceryItems;
	angular.element('#groceryItemField').focus()
	//groceryItemField
	if(!$routeParams.id){
		$scope.groceryItem = { id:0, completed:false, itemName:"", date: new Date()};
	}else{
		$scope.groceryItem = _.clone(GroceryService.findById(parseInt($routeParams.id)));
	}
	$scope.save = function(){
		GroceryService.save($scope.groceryItem);
		$location.path("/");
		//console.log($scope.groceryItems);
	}

}]);	
