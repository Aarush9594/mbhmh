function setup() {
    canvas = createCanvas(800,425)
    canvas.center()
    canvas.mouseReleased(classifyCanvas)
    synth = window.speechSynthesis
}

function draw() {
    strokeWeight(12)
    stroke(0)
    if (mouseIsPressed) {
        console.log("Mouse Is Pressed")
        line(pmouseX,pmouseY,mouseX,mouseY)
    }
}

function preload() {
    classifier=ml5.imageClassifier('DoodleNet')
}

function classifyCanvas() {
    classifier.classify(canvas,gotresult)
}

function gotresult(error,result) {
    if (error) {
        console.log(error)
    } else {
       console.log(result) 
     document.getElementById("label").innerHTML = "Label: "+result[0].label
     document.getElementById("confidence").innerHTML = "Confidence: "+Math.round(result[0].confidence*100)+"%"
     accuracy = Math.round(result[0].confidence*100)+"Percent"
     utter_this = new SpeechSynthesisUtterance("The confidence of"+result[0].label+"is"+accuracy)
     synth.speak(utter_this)
    }
}

function clearCanvas() {
    background("aquamarine")
}