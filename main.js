leftWrist = 0 ;
song ="" ;
song2 = "" ;
leftWrist_x = 0 ;
leftWrist_y = 0 ;
rightWrist_x = 0 ;
rightWrist_y = 0 ;
    


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}   
function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x + "leftWrist_y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = " + rightWrist_x + "rightWrist_y = " + rightWrist_y);
    }
}

function draw(){
    image(video , 0 , 0 , 600 , 500);
    
}

function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("musyc2.mp3");
}
function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}



