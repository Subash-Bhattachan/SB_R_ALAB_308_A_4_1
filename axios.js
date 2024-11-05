// setting up Axios
axios.defaults.baseURL = "https://api.thecatapi.com/v1";
//axios.defaults.common["x-api-key"] = "live_WlRTVBHIH4AN7yJo2s0Aw3fK5N7QJ7dXF2FrUqUmpArFGhWZ1pP4KIaYnVFSl0WB";


const progressBar = document.getElementById("progressBar");

// now creating the function to update the progress bar

function updateProgress(event) {
    console.log(event);
    if (event.lengthComputable) {
        const completedPercentage = (event.loaded / event.total) * 100;
        progressBar.style.width = `${completedPercentage}`;
    }
}


// Axios interceptors 
// request
axios.interceptors.request.use(config => {
    config.metadata = { startTime: new Date() };
    console.log(`Request starting at: ${config.metadata.startTime}`);
    progressBar.style.width = "0%"; // this resets the progres bar
    document.body.style.cursor = "progress";
    return config;
}, error => {
    return Promise.reject(error);
});

// response
axios.interceptors.response.use(response => {
    const duration = new Date() - response.config.metadata.startTime;
    console.log(`Request completed in: ${duration}ms`);
    progressBar.style.width = "100%";
    document.body.style.cursor = "default";
    return response;
}, error => {
    progressBar.style.width = "0%";
    return Promise.reject(error);
});


const selectedBreedId = breedSelect.value;

// to get the breeds
async function getBreeds() {
    try {
        const response = await axios.get("/breeds", {
            onDownloadProgress: updateProgress
        });
        return response.data;
    }
    catch (error) {
        console.log("There is an error getting the cat breeds:", error);
        throw error;
    }
}


// to get the images
async function getBreedImages() {
    try {
        const response = await axios.get(`/images/search?breed_ids=${selectedBreedId}&limit=5`, 
            {onDownloadProgress: updateProgress});
        return response.data;
    }
    catch (error) {
        console.log("There is an error getting the cat breeds:", error);
        throw error;
    }
}

// now exporting the functions 
export {getBreeds, getBreedImages};