particlesJS("particles-js", {
    particles: {
        number: { value:200, density:{ enable:true, value_area:1800 } },
        color: { value:"#ffffff" },
        shape: { type:"circle" },
        opacity: { value:0.7, random:true },
        size: { value:1.5, random:true },
        line_linked: { enable:false },
        move: { enable:true, speed:0.5, random:true, straight:false, out_mode:"out" }
    },
    interactivity: {
        detect_on:"canvas",
        events:{ onhover:{ enable:false }, onclick:{ enable:false } }
    },
    retina_detect:true
});
