var photoOrder=[];
var index=0;
var source, description, interval, duration;


function populatePhotos(){
    $("#innerContainer").html("");

    let photo=document.createElement("img");
    photo.src=source;
    photo.style.height="300px";
    photo.style.width="533px"
   $("#innerContainer").append(photo);
   $("#description p").html(description + "; interval:" + interval + "ms");
   clearInterval(duration);
   duration=setInterval(moveForward, interval);

        
}

    
function sendHttpRequest(method, url, data){
	const promise= new Promise(function(resolve, reject){
		const xhr=new XMLHttpRequest();
		xhr.open(method, url);
		xhr.responseType="json";

		if(data){
			xhr.setRequestHeader("Content-Type", "application/json");
		}
		xhr.onload= function() {
			if(xhr.status>=400){
				reject("something went wrong");
			}else{
				resolve(xhr.response);
			}
		};
	
		xhr.send(JSON.stringify(data));

	});
	return promise;
}

async function getPhotos(){
    $("#btnUpdate").hide();
    photoOrder=await sendHttpRequest('GET', 'photolist.json');
    console.log(photoOrder);
    source=photoOrder[index].source;
    description=photoOrder[index].description;
    interval=photoOrder[index].interval;
    populatePhotos();


}
function moveForward(){
 
        if(index==photoOrder.length-1){
            index=0;
        }else{
            index++;
        }
   
    getPhotos();
} 


function moveBack(){
   
        if (index === 0) {
           index = photoOrder.length-1;
        } else {
           index--;
        }
       getPhotos();
}

$("#next").hover(function(){
   $("#next p").show();
   $("#next").css("cursor", "pointer");},
   function(){ 
   $("#next p").hide()
});

$("#previous").hover(function(){
    $("#previous p").show();
    $("#previous").css("cursor", "pointer");}, 
    function(){
    $("#previous p").hide()
});

$("#next").click(function(){
    clearInterval(duration);
        moveForward();
});
$("#previous").click(function(){
    clearInterval(duration);
    moveBack();
});
$("#btnUpdate").click(getPhotos);


