function locomotiveAnimation(){
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        smartphone:{
            smooth:true
        }
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}



function videoConAnimation(){
    var videoCon = document.querySelector("#video-container")
var play = document.querySelector("#play")

videoCon.addEventListener("mouseenter",function(){
    gsap.to(play,{
        opacity:1,
        scale:1
    })
})
videoCon.addEventListener("mouseleave",function(){
    gsap.to(play,{
        opacity:0,
        scale:0
    })
})
videoCon.addEventListener("mousemove",function(dets){
    gsap.to(play,{
       left:dets.x-70,
       top:dets.y-80,
    })
})
}

function loadingAnimation(){
    gsap.from("#page1 h1",{
        y:100,
        opacity:0,
        delay:0.5,
        duration:0.9,
        stagger:0.4
    })
    gsap.from("#page1 #video-container",{
        scale:0.9,
        opacity:0,
        delay:1.2,
        duration:0.7,
    })
}

function cursorAnimation(){
    var cursor = document.querySelector("#cursor")
    document.addEventListener("mousemove",function(dets){
    gsap.to(cursor,{
        left:dets.x,
      top:dets.y
    })
  })
document.querySelectorAll(".child").forEach(function(elem){
  elem.addEventListener("mouseenter",function(){
      gsap.to(cursor,{
          transform: 'translate(-50%,-50%) scale(1)'
        
        })
  })
  elem.addEventListener("mouseleave",function(){
      gsap.to(cursor,{
          transform: 'translate(-50%,-50%) scale(0)'
          
   })
})
})
}


locomotiveAnimation()
cursorAnimation()
videoConAnimation()
loadingAnimation()
