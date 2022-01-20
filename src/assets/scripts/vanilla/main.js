// const { NONAME } = require("dns");

const cartes = document.querySelectorAll('.carte');
const carteSideA = document.querySelectorAll('.carte_side-a');
const carteSideB = document.querySelectorAll('.carte_side-b');
const sectionJeux = document.querySelector('.section_jeux');
1
let carteObject = [];

function changeAnimationAttribute() {
	if(window.innerWidth >= '1024') {  
		sectionJeux.setAttribute('data-animation', 'fadeInRight');
	} else {
		sectionJeux.setAttribute('data-animation', 'fadeInLeft');
	}
}

$(function(){

	$('.animate__animated').appear();

	const animationElement = $('.animation');

	animationElement.on('appear', function() {

		let element = $(this); 
		let animation = element.attr('data-animation');
		let delay = element.attr('data-delay');
		
		element.addClass(`animate__${animation}`);
		element.addClass(`animate__delay-${delay}`);
		
		if(element.attr('data-repeat') !== 1){ 
			let repeat = element.attr('data-repeat');

			element.addClass(`animate__repeat-${repeat}`)
		}
	});

});

const creerGraphiqueLigne = () => {
	let nombreBanque = [11, 15, 20, 24, 50];
	let voleurs = ['Willie Sutton', 'Bonnie et Clyde', 'Jesse James', 'John Dillinger', 'Carl Gugasian'];

    new RGraph.SVG.Line({
        id: 'chart-container',
        // data: [11, 15, 20, 24, 50],
		data: nombreBanque,
        options: {
            backgroundColor: '',
            backgroundGridColor: 'rgba(112, 94, 120, 0.2)',
            backgroundGridVlinesCount: 10,
            backgroundGridLinewidth: 1,
            colors: ['#361440'],
            tickmarksStyle: 'filledcircle',
            xaxis: false,
            yaxis: false,
            yaxisScaleUnitsPost: '',
            textSize: 12,
			xaxisLabels: voleurs,
			tooltips: [`${voleurs[0]} : ${nombreBanque[0]} banques`, `${voleurs[1]} : ${nombreBanque[1]} banques`, `${voleurs[2]} : ${nombreBanque[2]} banques`, `${voleurs[3]} : ${nombreBanque[3]} banques`, `${voleurs[4]} : ${nombreBanque[4]} banques`],
			title: 'Nombre de vol de banque'
        },
    
    }).trace().responsive([
		{maxWidth: null, width:400, height:300, options:{linewidth: 3,tickmarksSize: 6}, parentCss: {textAlign:'none'}, options:{xaxisLabelsAngle: 45, marginBottom: 110, marginLeft: 75, marginRight: 50}},

		{maxWidth: 1023, width:600, height:300, options:{linewidth: 2,tickmarksSize: 5}, parentCss: {textAlign:'center'}, options:{xaxisLabelsAngle: 25, marginBottom: 60, marginLeft: 90, marginRight: 90}},

        {maxWidth: 900, width:450, height:300, options:{linewidth: 2,tickmarksSize: 5}, parentCss: {textAlign:'center'}, options:{xaxisLabelsAngle: 45, marginBottom: 110, marginLeft: 100, marginRight: 100}}
    ]);
}

const dessinerCarte = () => {
	// J'ai mis ma carte sur mon codepen... https://codepen.io/ReineBeth/pen/bGRZdVm 
	// Pour pas que tu crois que j'ai plagié... 

	const monCanvas = document.getElementById('mon_canvas');
	const contexte = monCanvas.getContext('2d');
	
	contexte.fillStyle = "#BF8FAA";
	contexte.fillRect(0, 0, 400, 400);
	
	contexte.fillStyle = "#ECEBE6";
	contexte.beginPath();
	contexte.moveTo(200, 40);
	contexte.lineTo(360, 200);
	contexte.lineTo(200, 360); 
	contexte.lineTo(40, 200); 
	contexte.fill();
	
	contexte.fillStyle = "#352204";
	contexte.beginPath();
	contexte.moveTo(100, 160);
	contexte.bezierCurveTo(200, 170, 200, 170, 300, 160);
	contexte.bezierCurveTo(310, 190, 310, 200, 300, 220);
	contexte.bezierCurveTo(290, 230, 280, 240, 240, 240);
	contexte.bezierCurveTo(225, 225, 220, 220, 200, 220);
	contexte.bezierCurveTo(180, 220, 175, 225, 160, 240);
	contexte.bezierCurveTo(140, 240, 120, 240, 100, 220);
	contexte.bezierCurveTo(90, 200, 90, 190, 100, 160);
	contexte.fill();
	
	contexte.fillStyle = "#ECEBE6"; 
	contexte.beginPath(); 
	contexte.moveTo(120, 200);
	contexte.bezierCurveTo(145, 180, 145, 180, 170, 200);
	contexte.bezierCurveTo(145, 220, 145, 220, 120, 200);
	contexte.stroke();
	contexte.fill();
	
	contexte.beginPath(); 
	contexte.moveTo(230, 200);
	contexte.bezierCurveTo(255, 180, 255, 180, 280, 200);
	contexte.bezierCurveTo(255, 220, 255, 220, 230, 200);
	contexte.stroke();
	contexte.fill();
}

for(let index = 0; index < cartes.length; index++){
	carteObject[index] = {} 
	carteObject[index].nom = `Carte ${index}`;
	carteObject[index].coterA = carteSideA[index];
	carteObject[index].coterB = carteSideB[index];
	carteObject[index].estFlip = false;

	function flipCarte(event) {
		if(carteObject[index].estFlip){
			carteObject[index].estFlip = false;

			carteObject[index].coterA.classList.add('carte_actif');
			carteObject[index].coterA.classList.add('animate__animated');
			carteObject[index].coterA.classList.add('animate__flipInY');
			carteObject[index].coterA.setAttribute('aria-hidden', 'false');

			carteObject[index].coterB.classList.remove('carte_actif');
			carteObject[index].coterB.classList.remove('animate__animated');
			carteObject[index].coterB.classList.remove('animate__flipInY');
			carteObject[index].coterB.setAttribute('aria-hidden', 'true');
			
		} else {
			carteObject[index].estFlip = true;

			carteObject[index].coterB.classList.add('carte_actif');
			carteObject[index].coterB.classList.add('animate__animated');
			carteObject[index].coterB.classList.add('animate__flipInY');
			carteObject[index].coterB.setAttribute('aria-hidden', 'false');

			carteObject[index].coterA.classList.remove('carte_actif');
			carteObject[index].coterA.classList.remove('animate__animated');
			carteObject[index].coterA.classList.remove('animate__flipInY');
			carteObject[index].coterA.setAttribute('aria-hidden', 'true');
		}
	}

	cartes[index].addEventListener('click', flipCarte);
	cartes[index].addEventListener('keyup', function(event) {
		if(event.key == 'Enter') {
			flipCarte();
		}
	})
}

window.addEventListener('resize', changeAnimationAttribute);

const main = () => {
	creerGraphiqueLigne();
	dessinerCarte();
	changeAnimationAttribute();
}

main();