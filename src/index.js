import "./style.css"

import doggo1 from "./assets/images/doggo1.jpg"
import doggo2 from "./assets/images/doggo2.jpg"
import doggo3 from "./assets/images/doggo3.jpg"
import doggo4 from "./assets/images/doggo4.jpg"
import doggo5 from "./assets/images/doggo5.jpg"
const imageURLArray = [doggo1, doggo2, doggo3, doggo4, doggo5]

function imageSlider(){
    const imageSlider = document.createElement("div")
    imageSlider.id = "imageSlider"

    const leftNav = document.createElement("div")
    leftNav.id = "leftNav"
    leftNav.classList.add("directionalNav")
    imageSlider.appendChild(leftNav)
    leftNav.addEventListener("click", ()=>previousImage())

    let rotateImages = setInterval(nextImage, 5000)

    function previousImage(){
        clearInterval(rotateImages)
        const imgIndex = imageSlider.getAttribute("data-img-Index")
        if(imgIndex!=0){
            const previousImgIndex = Number(imgIndex) - 1
            imageSlider.style.backgroundImage = "url(" + imageURLArray[previousImgIndex] + ")"
            imageSlider.dataset.imgIndex = previousImgIndex
            document.getElementById("navDot"+imgIndex).style.background = "none"
            document.getElementById("navDot"+previousImgIndex).style.backgroundColor = "var(--navColor)"
        } else {
            imageSlider.style.backgroundImage = "url(" + imageURLArray[Number(imageURLArray.length)-1] + ")"
            imageSlider.dataset.imgIndex = Number(imageURLArray.length)-1
            document.getElementById("navDot"+0).style.background = "none"
            document.getElementById("navDot"+(Number(imageURLArray.length-1))).style.backgroundColor = "var(--navColor)"
        }
        rotateImages = setInterval(nextImage, 5000)
    }

    const dots = document.createElement("div")
    dots.classList.add("dots")
    imageSlider.appendChild(dots)
    for(let i = 0; i<imageURLArray.length;i++){
        const navDot = document.createElement("div")
        if(i==0){navDot.style.backgroundColor = "var(--navColor)"}
        navDot.id = "navDot" + i
        navDot.classList.add("navDot")
        const url = imageURLArray[i]
        dots.appendChild(navDot)
        navDot.addEventListener("click", ()=>clickNavDot(url, i))
    }

    function clickNavDot(url, i){
            clearInterval(rotateImages)
            imageSlider.style.backgroundImage = "url(" + url + ")"
            imageSlider.dataset.imgIndex =  i
            rotateImages = setInterval(nextImage, 5000)
    }

    const rightNav = document.createElement("div")
    rightNav.id = "rightNav"
    rightNav.classList.add("directionalNav")
    imageSlider.appendChild(rightNav)
    rightNav.addEventListener("click", (e)=>nextImage(e))


    function nextImage(e){
        console.log("next")
        if((e)&&(e.type=="click")){
            clearInterval(rotateImages)
            next()
            rotateImages = setInterval(nextImage, 5000)
        }else{
            next()
        }
        function next(){
            const imgIndex = imageSlider.getAttribute("data-img-Index")
            if(imgIndex<(imageURLArray.length-1)){
                const nextImgIndex = Number(imgIndex) + 1
                imageSlider.style.backgroundImage = "url(" + imageURLArray[nextImgIndex] + ")"
                imageSlider.dataset.imgIndex = nextImgIndex
                document.getElementById("navDot"+imgIndex).style.background = "none"
                document.getElementById("navDot"+nextImgIndex).style.backgroundColor = "var(--navColor)"
            } else {
                document.getElementById("navDot"+(imageURLArray.length-1)).style.background = "none"
                imageSlider.style.backgroundImage = "url(" + imageURLArray[0] + ")"
                imageSlider.dataset.imgIndex = 0
                document.getElementById("navDot"+0).style.backgroundColor = "var(--navColor)"
            }
        }
    }

    imageSlider.style.backgroundImage = "url(" + imageURLArray[0] + ")"
    imageSlider.dataset.imgIndex = 0
    imageSlider.style.backgroundSize = "cover"
    imageSlider.style.backgroundRepeat = "no-repeat"
    imageSlider.style.backgroundPosition = "center"
    imageSlider.style.transition = "background-image 1s ease-in-out"
    
    return imageSlider
}

document.getElementById("container").appendChild(imageSlider())