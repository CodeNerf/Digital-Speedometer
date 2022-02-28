console.clear();

let speedometer
let speed
let gearStatus
let regenStatus
let pulseGo


setInterval(function () {

Promise.all([
    fetch('http://sla.canbushack.com:5000/db_get/259/'), // Right Side
    fetch('http://sla.canbushack.com:5000/db_get/258/'), //Left Side
    fetch('http://sla.canbushack.com:5000/db_get/599/'), // Speed
    fetch('http://sla.canbushack.com:5000/db_get/280/') // Gears
]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
        return response.json();
    }));
}).then(function (data) {

    gearStatus = data[3]['DI_gear']['enumerated_value']
    speed = data[2]['DI_uiSpeed']['value']
    // speed = data[3]['DI_accelPedalPos']['value']
    // speed = 100
    regenStatus = data[3]['DI_regenLight']['value']
    pulseGo = document.getElementById("speed-bg__pulse")
    speedometer = document.getElementById("speed").innerHTML = speed
    console.log(speed)



if(speed >= 1) {
    const x = document.getElementsByClassName("speed-needle");
    Array.prototype.forEach.call(x, function(y) {
        y.style.transform = "rotate(" + speed * Math.PI .toString() + "deg)";
    });

}


    if(speed >= 1) {
        const x = document.getElementsByClassName("speed-glow inner");
        Array.prototype.forEach.call(x, function(y) {
            y.style.transform = "rotate(" + speed * Math.PI .toString() + "deg)";
        });

    }


    if(speed >= 51) {
       const glowInner = document.querySelector('.speed-glow.inner')
        const glowOuter = document.querySelector('.speed-glow.outer')
        glowInner.style.borderBottom = "solid 2vw red";
        glowOuter.style.borderBottom = "solid 2vw red";
        pulseGo.removeAttribute("class")
        pulseGo.classList.add("speed-bg__pulses")
        console.log(pulseGo)

    }

    if (speed <= 50) {
        const glowInner = document.querySelector('.speed-glow.inner')
        const glowOuter = document.querySelector('.speed-glow.outer')
        glowInner.style.borderBottom = "solid 2vw blue";
        glowOuter.style.borderBottom = "solid 2vw blue";
        console.log('ITS WORKING')
        pulseGo.removeAttribute("class")
        pulseGo.classList.add("speed-bg__pulse")

    }


if(speed === null) {


        speedometer = document.getElementById("speed").innerHTML = 'Hello'

    }

    else if (speedometer === undefined) {

         speedometer = document.getElementById("speed").innerHTML = 'Still not in motion '
    }

    if (gearStatus === "DI_GEAR_P") {
        speedometer = document.getElementById("gear").innerHTML = 'P'
    }

    if (gearStatus === "DI_GEAR_R") {
        speedometer = document.getElementById("gear").innerHTML = 'R'
    }

    if (gearStatus === "DI_GEAR_D") {
        speedometer = document.getElementById("gear").innerHTML = 'D'
    }

    if (gearStatus === "DI_GEAR_SNA") {
        speedometer = document.getElementById("speed").innerHTML = 'ACC'
    }

    // if (regenStatus === 1 ) {
    //     speedometer = document.getElementById("speed").innerHTML = 'REGEN ACTIVE'
    // }
    //
    // else if (regenStatus === 2) {
    //     speedometer = document.getElementById("speed").innerHTML = ''
    // }






    // console.log(gearStatus)

    console.log(data);
}).catch(function (error) {
    // errors get logged here
    console.log(error);
});


}, 500)







