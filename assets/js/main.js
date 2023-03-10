const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close')

// SHOW NAVBAR
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

// HIDDEN NAVBAR
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

// REMOVE MENU 
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// HIDDEN SKILLS
const skillsContent = document.getElementsByClassName('skills_content'),
    skillsHeader = document.querySelectorAll('.skills_header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills_content skills_close'
    }
    if(itemClass = 'skills_content skills_close'){
        this.parentNode.className = 'skills_content skills_open'
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

var canvasKita = document.querySelector('#myCanvas');
canvasKita.width = 300;
canvasKita.height = 300;
var ctx = canvasKita.getContext('2d');

const imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);

//fungsi GambarTitik//
function gambarTitik(imageDataTemp, x, y, r, g, b) {
    let index;
    index = 4 * (x + (y * myCanvas.width));
    imageDataTemp.data[index + 0] = r;	// R
    imageDataTemp.data[index + 1] = g;	// G
    imageDataTemp.data[index + 2] = b;	// B
    imageDataTemp.data[index + 3] = 255;	// A
}

// // /* Algoritma DDA */
function dda(imageData, x1, y1, x2, y2, r,g,b) {
  let dx = x2 - x1; 
  let dy = y2 - y1;
  
  if (Math.abs(dx) > Math.abs(dy)) {
    // Penambahan pada sumbu x
    let y = y1;
    if ( x2 > x1 ) {
      // Bergerak ke kanan
      for(let x = x1; x < x2; x++) {
        y = y + dy / Math.abs(dx); 
        gambarTitik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
      }
    } else {
      // Bergerak ke kiri//
      for(let x = x1; x > x2; x--){
        y = y + dy / Math.abs(dx);
        gambarTitik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
      }
    }
  } else {
    // Penambahan pada sumbu y
    let x = x1;
    if(y2 > y1) {
      // Bergerak ke Bawah
      for(let y = y1; y < y2; y++) {
        x = x + dx / Math.abs(dy);
        gambarTitik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
      }
    } else {
            // Bergerak ke atas
            for(let y = y1; y > y2; y--){
                x = x  + dx / Math.abs(dy);
                gambarTitik(imageData, Math.ceil(x),Math.ceil(y),r,g,b);
            }
        }
    }
}

// /* Menggambar Polygon */
function polygon(imageDataTemp, point_array, r,g,b) {
    let point = point_array[0];
    for(let i = 1; i < point_array.length; i++) {
        let point2 = point_array[i];
        dda(imageDataTemp, point.x, point.y, point2.x, point2.y, r,g,b);
        point = point2;
    }
    dda(imageDataTemp, point.x, point.y, point_array[0].x, point_array[0].y, r,g,b);
}

/* Algoritma floodFill */
function floodFill(imageDataTemp, canvas, x0,y0, toFlood, color) {
    let tumpukan = [];
    tumpukan.push({x : x0, y : y0});
    while(tumpukan.length > 0) {
       var titikSkrg = tumpukan.shift();
       var indexSkrg = 4 * (titikSkrg.x + titikSkrg.y * canvas.width);
       var r1 = imageDataTemp.data[indexSkrg + 0];
       var g1 = imageDataTemp.data[indexSkrg + 1];
       var b1 = imageDataTemp.data[indexSkrg + 2];
       if((r1 == toFlood.r) && (g1 == toFlood.g) && (b1 == toFlood.b)) {
            imageDataTemp.data[indexSkrg + 0] = color.r;
            imageDataTemp.data[indexSkrg + 1] = color.g;
            imageDataTemp.data[indexSkrg + 2] = color.b;
            imageDataTemp.data[indexSkrg + 3] = 255;

            tumpukan.push({x:titikSkrg.x+1, y:titikSkrg.y});
            tumpukan.push({x:titikSkrg.x-1, y:titikSkrg.y});
            tumpukan.push({x:titikSkrg.x, y:titikSkrg.y+1});
            tumpukan.push({x:titikSkrg.x, y:titikSkrg.y-1});
        }
    }
}


//lingkaran bressenham 
function Symetric(imageDataTemp, xc, yc, x, y, r, g, b){
  gambarTitik(imageDataTemp, x + xc, y + yc, r,g,b);
  gambarTitik(imageDataTemp, x + xc, -y + yc, r,g,b);
  gambarTitik(imageDataTemp, -x + xc, -y + yc, r,g,b);
  gambarTitik(imageDataTemp, -x + xc, y + yc, r,g,b);
  gambarTitik(imageDataTemp, y + xc, x + yc, r,g,b);
  gambarTitik(imageDataTemp, y + xc, -x + yc, r,g,b);
  gambarTitik(imageDataTemp, -y + xc, -x + yc, r,g,b);
  gambarTitik(imageDataTemp, -y + xc, x + yc, r,g,b);
}

function circleBressenham(imageDataTemp, xc, yc, radius, r, g, b){
  let x = 0; 
  let y = radius;
  let d = 3-2 * radius;
  Symetric(imageDataTemp, xc, yc, x, y, r, g, b);
  
  while (x <= y ){
    if (d <= 0){
      d = d + 4 * x + 6;
    } else {
      d = d + 4 * x - 4 * y + 10;
      y = y -1;
    }
    x = x + 1;
    Symetric(imageDataTemp, xc, yc, x, y);
  }
}

let pointArray = [
    {x:230, y:80},
    {x:230, y:218},
    {x:95, y:218},
    {x:95, y:80},
  ];

polygon(imageDataSaya, pointArray, 35,35,35);
floodFill(imageDataSaya,canvasKita,210,150,{r:0,g:0,b:0},{r:255,g:217,b:132});
circleBressenham(imageDataSaya, 210, 100, 7, 25, 25, 25);
ctx.putImageData(imageDataSaya, 0, 0);

//Logoo H//
ctx.lineWidth = 10;
ctx.beginPath();
ctx.moveTo(150, 160);
ctx.lineTo(150, 200);
ctx.lineTo(130, 200);
ctx.lineTo(130, 100);
ctx.lineTo(150, 100);
ctx.lineTo(150, 145);
ctx.lineTo(170, 145);
ctx.lineTo(170, 200);
ctx.lineTo(190, 200);
ctx.lineTo(190, 100);
ctx.lineTo(170, 100);
ctx.lineTo(170, 130);
ctx.lineJoin = 'round';
ctx.shadowOffsetX = 1.5;
ctx.shadowOffsetY = 1.5;
ctx.shadowBlur = 1.5;
ctx.shadowColor = 'rgba(25, 25, 25, 0.5)'; 
ctx.stroke();

ctx.font = 'bold italic Times';
ctx.fillText('R', 207.5, 104, 6, 10);