song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}   

function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("musyc2.mp3");
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    song1_status = song1.isPlaying();
    console.log("Harry Potter Theme Song = " + song1);
    song2_status = song2.isPlaying();
    console.log("Peter Pan Song = " + song2 )

    if(scoreRightWrist > 0.2)
    { 
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1_status == false){
            song1.play();
        }
        else{
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
        }
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status == false){
            song2.play();
        }
        else{
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
        }
    }

}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist );
        scoreRightWrist = results[0].pose.keypoints[10].score ;
        console.log("scoreRightWrist = " + scoreRightWrist );

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x + "leftWrist_y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = " + rightWrist_x + "rightWrist_y = " + rightWrist_y);
    }
}



function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}



