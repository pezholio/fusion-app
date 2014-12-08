angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {
  var init = function() {
    var buttons = angular.element(document.querySelectorAll('.home-button'));

    buttons.on('click', function(el) {
      target = angular.element(this).attr('data-target');
      window.location.href = target;
    });
  };

  init();

})

.controller('CalculateCtrl', function($scope) {

  var amountslider = angular.element(document.querySelector('#amount-slider'));
  var timeslider = angular.element(document.querySelector('#time-slider'));
  var amount = angular.element(document.querySelector('#amount'));
  var time = angular.element(document.querySelector('#time'));

  var calculate = function(el, destination, display) {
    destination.val(display);

    loan = parseInt(amountslider[0].value);
    years = parseInt(timeslider[0].value);

    total = (loan + ((loan * 0.1268) * years)).toFixed(2);
    monthly = (total / (years * 12)).toFixed(2);

    angular.element(document.querySelector('#length')).html(years * 12)
    angular.element(document.querySelector('#monthly')).html("£" + monthly.toString())
    angular.element(document.querySelector('#total')).html("£" + total.toString())
  }

  var init = function () {

    amountslider.val(100);
    amount.val('£100');

    timeslider.val(2);
    time.val('2 years');

    amountslider.on('change', function() {
      display = "£" + this.value;
      calculate(this, amount, display);
    });

    timeslider.on('change', function() {
      display = this.value + " years";
      calculate(this, time, display);
    });

  };

  init();

})

.controller('ApplyCtrl', function($scope, $ionicScrollDelegate) {

  var income = document.querySelectorAll('.income');
  var totalIncome = document.querySelector('#total-income');
  var incomePanel = document.querySelector('#income-panel');

  var expenditure = document.querySelectorAll('.expenditure');
  var totalExpenditure = document.querySelector('#total-expenditure');
  var expenditurePanel = document.querySelector('#expenditure-panel');

  var detailsPanel = document.querySelector('#details-panel')

  $scope.showIncome = function() {
    angular.element(detailsPanel).addClass('hidden');
    angular.element(incomePanel).removeClass('hidden');
    $ionicScrollDelegate.scrollTop();
  }

  $scope.showExpenditure = function() {
    angular.element(incomePanel).addClass('hidden');
    angular.element(expenditurePanel).removeClass('hidden');
    $ionicScrollDelegate.scrollTop();
  }

  var totalize = function(els, total) {
    var i = 0
    angular.forEach(els, function(el){
      i += parseInt(el.value || 0);
    });
    angular.element(total).val(i);
  }

  var init = function() {
    angular.element(income).on('keyup', function() {
      totalize(income, totalIncome);
    });

    angular.element(expenditure).on('keyup', function() {
      totalize(expenditure, totalExpenditure);
    });

    angular.element(expenditurePanel).addClass('hidden');
    angular.element(incomePanel).addClass('hidden');
  }

  init();

});
