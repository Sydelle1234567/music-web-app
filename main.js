song="";
scoreLeftWrist=0
scoreRightWrist=0
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500)
    fill("#ff0000")
    stroke("#ff0000")
    if(scoreRightWrist>0.2){
        circle(rightwristX,rightwristY,20);
        if(rightwristY>0&&rightwristY<=100){
            document.getElementById("speed").innerHTML="Speed=0.5x";
            song.rate(0.5);
        }else if(rightwirstY>100&&rightwristY<200){
            document.getElementById("speed").innerHTML="Speed=1x";
            song.rate(1)
        }else if(rightwirstY>200&&rightwristY<300){
            document.getElementById("speed").innerHTML="Speed=1.5x";
            song.rate(1.5)
        }else if(rightwirstY>300&&rightwristY<400){
            document.getElementById("speed").innerHTML="Speed=2x";
            song.rate(2)
        }else if(rightwirstY>400&&rightwristY<500){
            document.getElementById("speed").innerHTML="Speed=2.5x";
            song.rate(2.5)
        }
}
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20)
        InNumberleftwristY=Number(leftWristY)
        remove_decimals=floor(InNumberleftwristY)
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume="+volume;
        song.setVolume(volume)
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log('poseNet is Initialised')
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score
        console.log("scoreLeftWrist="+scoreLeftWrist)
        scoreRightWrist=results[0].pose.keypoints[10].score
        console.log("scoreRightWrist="+scoreRightWrist)
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log('leftWristX='+leftWristX+' leftWristY='+leftWristY)
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log('rightWristX='+rightWristX+' rightWristY='+rightWristY)
    }
}