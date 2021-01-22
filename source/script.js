function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function formatNumber(num) {
  return  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  
}

// Calculate Driver's monthly cost
function runCalc () {

  const maintenancePerMile = 0.13;
  const depreciationPerMile = 0.10;
  const taxieRentalCost = 400;
  const standardRentalCost = 350;
  var driverCost;
  var driverCostAssumption;

  // Define Locally
  var gasPriceOutputLocal = parseInt(gasPriceOutput.innerHTML);
  var milesPerGallonOutputLocal = parseInt(milesPerGallonOutput.innerHTML);
  var milesPerYearOutputLocal = parseInt(milesPerYearOutput.innerHTML);
  var carPaymentOutputLocal = parseInt(carPaymentOutput.innerHTML);
  var insurancePaymentOutputLocal = parseInt(insurancePaymentOutput.innerHTML);
  var luxBonus; //Make this a percentage

  // Current cost for driver: ( Price for Gas / MPG ) X (Miles Per Year / 12.5 ) + Monthly Car payment + Monthly Insurance payment
  // Current cost for driver: (    S4        /   S3 ) X (    S0        /  12.5 ) +       S1            +         S2

  driverCost = (gasPriceOutputLocal/milesPerGallonOutputLocal)*(milesPerYearOutputLocal/12) + (carPaymentOutputLocal+insurancePaymentOutputLocal);

  driverCost = currencyFormat(carPaymentOutputLocal);
  
  //Apply Assumptions
  driverCostAssumption = driverCost - (milesPerYearOutput.innerHTML*depreciationPerMile) - (milesPerYearOutput.innerHTML*maintenancePerMile);
  

  document.getElementById("driverCost").innerHTML =  1100;
  
  // Debugging output
  console.log(driverCost);
  
  
}

//How many miles do you drive per year?
var slider = document.getElementById("Range00");
var milesPerYearOutput = document.getElementById("slider00");
milesPerYearOutput.innerHTML = formatNumber(slider.value);

slider.oninput = function() {
  milesPerYearOutput.innerHTML = formatNumber(this.value);
  runCalc();
  move();

}

//What is your current monthly car payment? (Loan, Lease or Rental)
var slider01 = document.getElementById("Range01");
var carPaymentOutput = document.getElementById("slider01");
carPaymentOutput.innerHTML = currencyFormat(parseInt(slider01.value));

slider01.oninput = function() {
  carPaymentOutput.innerHTML = currencyFormat(parseInt(this.value));
  runCalc();
  move();
}

// What is your current monthly insurance payment?
var slider02 = document.getElementById("Range02");
var insurancePaymentOutput = document.getElementById("slider02");
insurancePaymentOutput.innerHTML = currencyFormat(parseInt(slider02.value));

slider02.oninput = function() {
  insurancePaymentOutput.innerHTML = currencyFormat(parseInt(this.value));
  runCalc();
  move();
}

// On average what is the price of gas in your city?
var slider03 = document.getElementById("Range03");
var gasPriceOutput = document.getElementById("slider03");
gasPriceOutput.innerHTML = currencyFormat(parseFloat(slider03.value));

slider03.oninput = function() {
  gasPriceOutput.innerHTML = currencyFormat(parseFloat(this.value));
  runCalc();
  move();
}

// On average how many miles per gallon to you get?
var slider04 = document.getElementById("Range04");
var milesPerGallonOutput = document.getElementById("slider04");
milesPerGallonOutput.innerHTML = slider04.value;

slider04.oninput = function() {
  milesPerGallonOutput.innerHTML = this.value;
  runCalc();
  move();
  
}

// Calculation Animation
// How long the animation will last in ms
const animationDuration = 2000;
// Calculate how long each frame should last. Update the animation 60 times per second
const frameDuration = 1000 / 60;
// Calculate how many frames we need to complete the animation
const totalFrames = Math.round( animationDuration / frameDuration );
// An ease-out function that slows the count as it progresses
const easeOutQuad = t => t * ( 2 - t );

// The animation function, passing an Element
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
      document.getElementById("driverCost").innerHTML = currentCount;
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
};

// Annual Savings progress bar
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
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



//initial  function calls
runCalc();
runAnimations();
move();





