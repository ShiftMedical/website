(function(){
	var app = angular.module("Medjuvo", ["ui.bootstrap"]);

	app.constant("appConfig", {
		"brandName": "Medjuvo",
		"brandTagline": "Numb the pain of practicing medicine",
		"brandLeadText": "Where you can do all the things. We make it easy to do all the things. You should sign up now."
	});

	app.controller("ApplicationController", [
		"$log",
		"$scope",
		"$modal",
		"appConfig",
		function($log, $scope, $modal, appConfig) {
			$scope.brandName = appConfig.brandName;
			$scope.brandTagline = appConfig.brandTagline;
			$scope.brandLeadText = appConfig.brandLeadText;
			$scope.learnMore = "Learn More";

			$scope.modalContext = {};

			$scope.openLearnMoreModal = function (size) {
				$log.debug("Opening modal");

				var modalInstance = $modal.open({
					templateUrl: 'templates/learnMoreModalContent.html',
					controller: 'LearnMoreModalInstanceController',
					size: size,
					resolve: {
						context: function () {
							return $scope.modalContext;
						}
					}
				});

				modalInstance.result.then(function (formData) {
					$scope.formData = formData;
					$log.debug(formData.fullName);
					$log.debug(formData.email);
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});
			};
		}
		]);

	app.controller("LearnMoreModalInstanceController", [
		"$scope",
		"$modalInstance",
		"context",
		function($scope, $modalInstance, context) {
			$scope.ok = function () {
				$modalInstance.close($scope.formData);
			};

			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
		}
		]);
}());