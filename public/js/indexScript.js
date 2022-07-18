let leftIMG = document.getElementById("icon1");
let rightIMG = document.getElementById("icon2");
let leftLabel = document.getElementById("label1");
let rightLabel = document.getElementById("label2");
let IMG3 = document.getElementById("icon3");
let label3 = document.getElementById("label3");
let IMG4 = document.getElementById("icon4");
let label4 = document.getElementById("label4")


IMG4.addEventListener("mouseover", () =>{
    label4.setAttribute("style","color:white");
})

IMG4.addEventListener("mouseout", () =>{
    label4.setAttribute("style","color:cornflowerblue");
    label3.removeAttribute()

})




IMG3.addEventListener("mouseover", () =>{
    label3.setAttribute("style","color:white");
})

IMG3.addEventListener("mouseout", () =>{
    label3.setAttribute("style","color:cornflowerblue");
})

leftIMG.addEventListener("mouseover", () =>{
    leftLabel.setAttribute("style","color:white");
})

leftIMG.addEventListener("mouseout", () =>{
    leftLabel.setAttribute("style","color:cornflowerblue");
})

rightIMG.addEventListener("mouseover", () =>{
    rightLabel.setAttribute("style","color:white");
})

rightIMG.addEventListener("mouseout", () =>{
    rightLabel.setAttribute("style","color:cornflowerblue");
})



leftIMG.addEventListener("click", () =>{
    window.open("serpinski.html");
});

rightIMG.addEventListener("click", () =>{
    window.open("morphPage.html");
});

IMG3.addEventListener("click", () => {
    window.open("saul.html");
})

IMG4.addEventListener("click", () =>{
    window.open("realtime.html");
})