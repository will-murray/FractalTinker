let Gallery = document.getElementById("GalleryBox")
let SandboxBTN = document.getElementById("icon")
Gallery.onclick = function(){
    window.open("gallery.html")
}
Gallery.onmouseover = function(){
    Gallery.style.backgroundColor = "cornflowerblue"
    Gallery.style.color = "white"
    
}
Gallery.onmouseout = function(){
    Gallery.style.backgroundColor = "white"
    Gallery.style.color = "black"
    
}


SandboxBTN.onclick = function(){
    window.open("realtime.html")
}

SandboxBTN.onmouseover = function(){
    SandboxBTN.style.backgroundColor = "cornflowerblue"
    SandboxBTN.style.color = "white"
    
}
SandboxBTN.onmouseout = function(){
    SandboxBTN.style.backgroundColor = "white"
    SandboxBTN.style.color = "black"
}  