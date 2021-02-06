function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function formatNumber(num) {
  return  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  
}

  // Define Globally
  var gasPriceOutputLocal;
  var milesPerGallonOutputLocal;
  var milesPerYearOutputLocal;
  var carPaymentOutputLocal;
  var insurancePaymentOutputLocal;
  var luxBonus = 1.2; //Make this a percentage
  var globaldriverCost;
  var globalDriverCostAssumption;
  var globalTaxiedriverCost;
  var globalyearlyBenefit;

// Calculate Driver's monthly cost
function runCalc () {

  const maintenancePerMile = 0.13;
  const depreciationPerMile = 0.10;
  const taxieRentalCost = 400;
  const standardRentalCost = 350;
  var driverCost;
  var driverCostAssumption;
  var driverCostAssumptionString;
  var driverCostString;
  var taxieDriverCostString;
  var yearlyBenefit;

  // Taxie Cost Model
  var weeklyRentalCost = 350;
  var monthlyRentalCost = weeklyRentalCost * 4.35;


  // Current cost for driver: ( Price for Gas / MPG ) X (Miles Per Year / 12.5 ) + Monthly Car payment + Monthly Insurance payment
  // Current cost for driver: (    S4        /   S3 ) X (    S0        /  12.5 ) +       S1            +         S2

  driverCost = ((gasPriceOutputLocal/milesPerGallonOutputLocal)*(milesPerYearOutputLocal/12)) + (carPaymentOutputLocal+insurancePaymentOutputLocal);

  driverCostString = driverCost.toString();
  globaldriverCost = driverCostString;
  
  //Apply Assumptions
  driverCostAssumption = (driverCost + ((milesPerYearOutputLocal*depreciationPerMile) + (milesPerYearOutputLocal*maintenancePerMile))/12);
  driverCostAssumptionString = driverCostAssumption.toString();
  globalDriverCostAssumption = driverCostAssumptionString;



  taxieDriverCostString = monthlyRentalCost.toString();
  globalTaxiedriverCost = taxieDriverCostString;


  // Driver Benefit
  yearlyBenefit = driverCostAssumption - monthlyRentalCost;
  globalyearlyBenefit = yearlyBenefit.toString();
  
  display();
  


  
  // Debugging output

  // console.log("yearlyBenefit");
  // console.log(typeof yearlyBenefit);
  // console.log(yearlyBenefit);
  // console.log("_____________________");  
  // console.log("driverCostAssumption");
  // console.log(typeof driverCostAssumption);
  // console.log(driverCostAssumption);
  // console.log("_____________________");
  // console.log("monthlyRentalCost");
  // console.log(typeof monthlyRentalCost);
  // console.log(monthlyRentalCost);
  // console.log("_____________________");
  // console.log("globalyearlyBenefit");
  // console.log(typeof globalyearlyBenefit);
  // console.log(globalyearlyBenefit);
  // console.log("_____________________");
  // console.log("gasPriceOutputLocal");
  // console.log(typeof gasPriceOutputLocal);
  // console.log(gasPriceOutputLocal);
  // console.log("_____________________");
  // console.log("milesPerGallonOutputLocal");
  // console.log(typeof milesPerGallonOutputLocal);
  // console.log(milesPerGallonOutputLocal);
  // console.log("_____________________");
  // console.log("milesPerYearOutputLocal");
  // console.log(typeof milesPerYearOutputLocal);
  // console.log(milesPerYearOutputLocal);
  // console.log("_____________________");
  // console.log("carPaymentOutputLocal");
  // console.log(typeof carPaymentOutputLocal);
  // console.log(carPaymentOutputLocal);
  // console.log("_____________________");
  // console.log("insurancePaymentOutputLocal");
  // console.log(typeof insurancePaymentOutputLocal);
  // console.log(insurancePaymentOutputLocal);
  // console.log("_____________________");
  // console.log("maintenancePerMile");
  // console.log(typeof maintenancePerMile);
  // console.log(maintenancePerMile);
  // console.log("_____________________");
  // console.log("depreciationPerMile");
  // console.log(typeof depreciationPerMile);
  // console.log(depreciationPerMile);

  
}

//How many miles do you drive per year?
var slider = document.getElementById("Range00");
var milesPerYearOutput = document.getElementById("slider00");
milesPerYearOutputLocal = 50000;
milesPerYearOutput.innerHTML = formatNumber(slider.value);

slider.oninput = function() {
  milesPerYearOutput.innerHTML = formatNumber(this.value);
  milesPerYearOutputLocal = parseInt(this.value);
  runCalc();
  runAnimations();
  move();

}

//What is your current monthly car payment? (Loan, Lease or Rental)
var slider01 = document.getElementById("Range01");
var carPaymentOutput = document.getElementById("slider01");
carPaymentOutputLocal =  400;
carPaymentOutput.innerHTML = currencyFormat(parseInt(slider01.value));


slider01.oninput = function() {
  carPaymentOutput.innerHTML = currencyFormat(parseInt(this.value));
  carPaymentOutputLocal = parseInt(this.value);
  runCalc();
  runAnimations();
  move();
}

// What is your current monthly insurance payment?
var slider02 = document.getElementById("Range02");
var insurancePaymentOutput = document.getElementById("slider02");
insurancePaymentOutputLocal = 200;
insurancePaymentOutput.innerHTML = currencyFormat(parseInt(slider02.value));


slider02.oninput = function() {
  insurancePaymentOutput.innerHTML = currencyFormat(parseInt(this.value));
  insurancePaymentOutputLocal = parseInt(this.value);
  runCalc();
  runAnimations();
  move();
}

// On average what is the price of gas in your city?
var slider03 = document.getElementById("Range03");
var gasPriceOutput = document.getElementById("slider03");
gasPriceOutputLocal = 3;
gasPriceOutput.innerHTML = currencyFormat(parseFloat(slider03.value));


slider03.oninput = function() {
  gasPriceOutput.innerHTML = currencyFormat(parseFloat(this.value));
  gasPriceOutputLocal = parseInt(this.value);
  runCalc();
  runAnimations();
  move();
}

// On average how many miles per gallon to you get?
var slider04 = document.getElementById("Range04");
var milesPerGallonOutput = document.getElementById("slider04");
milesPerGallonOutputLocal = 25;
milesPerGallonOutput.innerHTML = slider04.value;

slider04.oninput = function() {
  milesPerGallonOutput.innerHTML = this.value;
  milesPerGallonOutputLocal = parseInt(this.value);
  runCalc();
  runAnimations();
  move();
  
}

// Calculation Animation
// How long you want the animation to take, in ms
const animationDuration = 2000;
// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
const frameDuration = 1000 / 60;
// Use that to calculate how many frames we need to complete the animation
const totalFrames = Math.round( animationDuration / frameDuration );
// An ease-out function that slows the count as it progresses
const easeOutQuad = t => t * ( 2 - t );

// The animation function, which takes an Element
const animateCountUp = el => {
	let frame = 0;
	const countTo = document.getElementById("driverCost").innerHTML;
	// Start the animation running 60 times per second
	const counter = setInterval( () => {
		frame++;
		// Calculate our progress as a value between 0 and 1
		// Pass that value to our easing function to get our
		// progress on a curve
		const progress = easeOutQuad( frame / totalFrames );
		// Use the progress value to calculate the current count
		const currentCount = Math.round( countTo * progress );

		// If the current count has changed, update the element
		if ( parseInt( document.getElementById("driverCost").innerHTML, 10 ) !== currentCount ) {
      document.getElementById("driverCost").innerHTML = currencyFormat(currentCount);
		}

		// If we’ve reached our last frame, stop the animation
		if ( frame === totalFrames ) {
			clearInterval( counter );
		}
	}, frameDuration );
};

//****************************************************************************** */


// The animation function, which takes an Element
const animateCountUpTaxie = el => {
	let frame = 0;
	const countTo = document.getElementById("driverCost2").innerHTML;
	// Start the animation running 60 times per second
	const counter = setInterval( () => {
		frame++;
		// Calculate our progress as a value between 0 and 1
		// Pass that value to our easing function to get our
		// progress on a curve
		const progress = easeOutQuad( frame / totalFrames );
		// Use the progress value to calculate the current count
		const currentCount = Math.round( countTo * progress );

		// If the current count has changed, update the element
		if ( parseInt( document.getElementById("driverCost2").innerHTML, 10 ) !== currentCount ) {
      document.getElementById("driverCost2").innerHTML = currencyFormat(currentCount);
		}

		// If we’ve reached our last frame, stop the animation
		if ( frame === totalFrames ) {
			clearInterval( counter );
		}
	}, frameDuration );
};

// Run the animation on all elements with a class of ‘countup’
const runAnimations = () => {
	const countupEls = document.querySelectorAll( '.countup' );
  countupEls.forEach( animateCountUp );
  countupEls.forEach( animateCountUpTaxie );
};

const runTaxieAnimations = () => {
	const countupEls = document.querySelectorAll( '.countup' );
  countupEls.forEach( animateCountUpTaxie );
};

// Annual Savings progress bar
var i = 0;
function move() {
  
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    console.log("myBar");
    console.log(typeof elem);
    console.log(elem);
    console.log("_____________________");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 48) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

function display () {
  
  document.getElementById("driverCostText").innerHTML =  "Your Current Cost";
  document.getElementById("driverCost").innerHTML =  parseInt(globalDriverCostAssumption);

  document.getElementById("taxiDriverCostText").innerHTML =  "Cost With Taxie";
  document.getElementById("driverCost2").innerHTML =  parseInt(globalTaxiedriverCost);
  
}

//initial  function calls
runCalc();
runAnimations();
runTaxieAnimations();
move();







