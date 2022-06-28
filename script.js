var content = document.getElementById("wheel");
var spin = document.getElementById("button");



var slot = document.getElementById("slot");
var i, x = 0;

var tick = 0;
var cycle = 6 * 360;
var prize = 0;

var prizewon = false;
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width / 2;
cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
    { front: 'red', back: 'darkred' },
    { front: 'green', back: 'darkgreen' },
    { front: 'blue', back: 'darkblue' },
    { front: 'yellow', back: 'darkyellow' },
    { front: 'orange', back: 'darkorange' },
    { front: 'pink', back: 'darkpink' },
    { front: 'purple', back: 'darkpurple' },
    { front: 'turquoise', back: 'darkturquoise' }];
resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = ctx.canvas.width / 2;
    cy = ctx.canvas.height / 2;
};

randomRange = (min, max) => Math.random() * (max - min) + min;

initConfetti = () => {
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            color: colors[Math.floor(randomRange(0, colors.length))],
            dimensions: {
                x: randomRange(10, 20),
                y: randomRange(10, 30)
            },

            position: {
                x: randomRange(0, canvas.width),
                y: canvas.height - 1
            },

            rotation: randomRange(0, 2 * Math.PI),
            scale: {
                x: 1,
                y: 1
            },

            velocity: {
                x: randomRange(-25, 25),
                y: randomRange(0, -50)
            }
        });


    }
};


render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;


        ctx.translate(confetto.position.x, confetto.position.y);
        ctx.rotate(confetto.rotation);


        confetto.velocity.x -= confetto.velocity.x * drag;
        confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
        confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();


        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;

        if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

        if (confetto.position.x > canvas.width) confetto.position.x = 0;
        if (confetto.position.x < 0) confetto.position.x = canvas.width;


        confetto.scale.y = Math.cos(confetto.position.y * 0.1);
        ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;


        ctx.fillRect(-width / 2, -height / 2, width, height);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    });



    window.requestAnimationFrame(render);
};




spin.onclick = function () {

    slot.innerHTML = "You won<br>";
    spin.style.backgroundColor = "#476eb4";
    spin.style.opacity = "0.6";
    spin.style.boxShadow = "0 3px 1.5px #666";
    spin.style.transform = "translate(0%, 14%)";
    spin.style.pointerEvents = "none";

    tick++;
    cycles = Math.ceil(Math.random() * 360) + (cycle * tick);
    content.style.transform = "rotate(" + cycles + "deg)";
    prize = Math.ceil((cycles % 360) / 45);
    console.log(prize);
};


content.ontransitionend = function () {
    switch (prize) {
        case 1: slot.innerHTML += "Nothing🙁";

            alert("Close but no cigar!");





            break;
        case 2: slot.innerHTML += "Amazon voucher";


            initConfetti();
            render();
            alert("Congrats!!You won Amazon voucher worth Rs.150.");

            break;
        case 3: slot.innerHTML += "Bitcoin";
            initConfetti();
            render();
            alert("Congrats!!You won Bitcoin worth Rs.5000.");

            break;
        case 4: slot.innerHTML += "Swiggy voucher";
            initConfetti();
            render();
            alert("Congrats!!You won Swiggy voucher worth Rs.250.");


            break;
        case 5: slot.innerHTML += "Nothing";
            alert("Close but no cigar!");

            break;
        case 6: slot.innerHTML += "Amazon voucher";
            initConfetti();
            render();
            alert("Congrats!!You won Amazon voucher worth Rs.150.");

            break;
        case 7: slot.innerHTML += "Bitcoin";
            initConfetti();
            render();
            alert("Congrats!!You won Bitcoin worth Rs.1000.");

            break;
        case 8: slot.innerHTML += "Swiggy voucher";
            initConfetti();
            render();
            alert("Congrats!!You won Swiggy voucher worth Rs.250.");


            break;
    }







    spin.style.boxShadow = "0 5px 1.5px #999";
    spin.style.opacity = "1";
    spin.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    spin.style.transform = "translate(0%, 0%)";
    spin.style.pointerEvents = "auto";

}


    ;
