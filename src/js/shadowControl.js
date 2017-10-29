document.addEventListener('DOMContentLoaded', function(){
    const element = document.getElementById("dot-control");
    element.addEventListener("mousedown", function(e){
        onMouseMove();
    },false)

    const elementRect = element.getBoundingClientRect();
    console.log(elementRect);


    function onMouseMove(){
        
            
            document.addEventListener("mousemove", mouseMove,false)
        
            document.addEventListener("mouseup", function(e){
                e.stopPropagation();
                document.removeEventListener("mousemove", mouseMove);
            },false);
        
        
            function mouseMove(e){
                console.log(element.attributes);
               
                x = elementRect.left - e.pageX;
                y = elementRect.top - e.pageY;
                console.log(x,y);
                element.style.transform = `translate(${x},${y})`;
            }
            
        }
    

    
})

