function Calculate(radius, count, electricCurrent, z){
    const mu = 4 * Math.PI * Math.pow(10, -7);

    let firstPart = mu * electricCurrent * Math.pow(radius, 2) * count / 2;
    let secondPart = 1 / (Math.pow(Math.pow(z, 2) + Math.pow(radius, 2), 1.5));
    let thirdPart = 1 / (Math.pow(Math.pow(z - radius, 2) + Math.pow(radius, 2), 1.5));

    return firstPart * (secondPart + thirdPart);
}

function Plotting(radius, count, electricCurrent){

    let x_coordinate = [];
    let y_coordinate = [];
    
    for (let z = 0; z <= 10000; ++z){

        x_coordinate[z] = z / 10000 * radius;
        y_coordinate[z] = Calculate(radius, count, electricCurrent, x_coordinate[z]);
    }

    var result = {
        x: x_coordinate, 
        y: y_coordinate, 
        mode: 'lines'
    };

    var layout = {
        title:'График зависимости вектора магнитной индукции от координаты',
        width: 750,
        height: 500,
    };

    Plotly.newPlot('tester', [result], layout);
}

let radiusSlider = document.getElementById("coilRadius");
let radiusLabel = document.getElementById("coilRadiusLabel");

let countSlider = document.getElementById("coilCount");
let countLabel = document.getElementById("coilCountLabel");

let electricSlider = document.getElementById("electricCurrent");
let electricLabel = document.getElementById("electricCurrentLabel");

let radius = Number(radiusSlider.value);
let count = Number(countSlider.value);
let electricCurrent = Number(electricSlider.value);

radiusSlider.addEventListener("input", function(e){
    radius = Number(radiusSlider.value);
    radiusLabel.innerHTML = "Радиус катушек (см): " + radius;
    Plotting(radius / 100, count, electricCurrent);
});

countSlider.addEventListener("input", function(e){
    count = Number(countSlider.value);
    countLabel.innerHTML = "Количество ветков: " + count;
    Plotting(radius / 100, count, electricCurrent);
});

electricSlider.addEventListener("input", function(e){
    electricCurrent = Number(electricSlider.value);
    electricLabel.innerHTML = "Сила тока (А): " + electricCurrent;
    Plotting(radius / 100, count, electricCurrent);
});