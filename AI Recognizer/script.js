//The initial setup
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const statusDiv = document.getElementById('status');
const resultList = document.getElementById('resultList');
let model; //main brain of the AI model
let customModel;
const customURL = "https://teachablemachine.withgoogle.com/models/iTnFna6Qx/"
// loading the brain
async function loadModel(){
    try {
        model = await mobilenet.load(); //following lines are for test,can be deleted later
        const modelURL = customURL + "model.json?v=" + 1;
        const metadataURL = customURL + "metadata.json?v=" + 1;
        customModel = await tmImage.load(modelURL, metadataURL);
        imageUpload.disabled = false;   //enables the choose file button once the model loads
        statusDiv.innerText = "Kindly upload an image";
        statusDiv.style.color = "#29bc3fff";
    } catch (error) {
        statusDiv.innerText="Error! Check your network.";
        statusDiv.style.color = "#ff0000ff";
        console.error(error);
    }
}
loadModel(); //calling the function

//Uploads handling (Trigger)
imageUpload.addEventListener('change',function(event) {
    const file = event.target.files[0]; //grabbing only the first image uploaded even if multiple are uploaded
    if (!file)
        return;
    const imgURL = URL.createObjectURL(file);
    imagePreview.src = imgURL;
    imagePreview.style.display = 'block';
    resultList.innerHTML = '';
    statusDiv.innerText = "Analyzing your image..."
    imagePreview.onload = async function () { //once image has loaded
        classifyImage();
    }
}
);

//Classification of image
async function classifyImage() {
    if(!model || !customModel) 
        return;
    const customPredictions = await customModel.predict(imagePreview);
    customPredictions.sort((a, b) => b.probability - a.probability);
    const bestGuess = customPredictions[0];

    //Logic for my custom model taught using Teachable Machine
    if (bestGuess.probability > 0.81 && bestGuess.className !== "Nothing") {
        const li = document.createElement('li');
        const percentage = (bestGuess.probability * 100).toFixed(1);
    
        li.innerHTML = `
            <span>${bestGuess.className}</span>
            <span class="prob" style="color: purple;">${percentage}%</span>
        `;
        resultList.appendChild(li);
    }

    //Mobilenet logic
    const predictions = await model.classify(imagePreview);
    statusDiv.innerText = "I think the image in the object is:";
    
    predictions.forEach(prediction => {
        const li = document.createElement('li');
        const percentage = (prediction.probability * 100).toFixed(2);
        li.innerHTML = `
        <span>${prediction.className}</span>
        <span class = "prob"> ${percentage}%</span>
        `;
        resultList.appendChild(li); 
    });
}