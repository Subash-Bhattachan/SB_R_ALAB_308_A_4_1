//import * as Carousel from "./Carousel.js";
import axios from "axios";
import { getBreeds, getBreedImages } from "./axios.js";
import { start } from "./Carousel.js";
import { createCarouselItems } from "./Carousel.js";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_WlRTVBHIH4AN7yJo2s0Aw3fK5N7QJ7dXF2FrUqUmpArFGhWZ1pP4KIaYnVFSl0WB";

console.log("testllllll");

//getFavouritesBtn.textContent = "ollssss";

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
async function initialLoad() {
  try {
    // fetching the list of breeds from the API
    // const response = await fetch("https://api.thecatapi.com/v1/breeds");
    // const breeds = await response.json();

    const breeds = await getBreeds();

    // now creating option for each breed by using for loop
    breeds.forEach((breed) => {
      const option = document.createElement("option");

      breedSelect.appendChild(option);
      option.value = breed.id;
      option.textContent = breed.name;
    });

    breedSelect.addEventListener("change", startCarousel);
    startCarousel();
    //moveCarousels();
    document.addEventListener("DOMContentLoaded", () => {
      start();
    })

    // to start the Carousel
  } catch (error) {
    console.error("There is some error while fetching breed data", error);
  }
  //console.log(jsonData);
  //console.log("hello22222");
}
//initialLoad();


/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */


async function startCarousel() {
const selectedBreedId = breedSelect.value;
const carouselInner = document.getElementById("carouselInner");

console.log("Selected Breed ID:", selectedBreedId);


// cleaning previous carousel images and info
  carouselInner.innerHTML = "";
  infoDump.innerHTML = "";

try {

   const catImages = await getBreedImages();
  
  //console.log(catImages);

  if(!catImages || catImages.length === 0) {
    infoDump.innerHTML = "There are no images available for this breed.";
    return;
  }
  
// to create carousel images
  catImages.forEach((catImage, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("carousel-item");

    if (index === 0) {
      itemDiv.classList.add("active");
    }
    
    const imgElement = document.createElement("img");
    imgElement.src = catImage.url;
    
    imgElement.classList.add("d-block", "w-100");
    
    itemDiv.appendChild(imgElement);
    carouselInner.appendChild(itemDiv);
  });
const selectedBreed = document.getElementById("breedSelect")
const breedDescription = selectedBreed.textContent;
//const breedInfo = catImages[0]?.breeds[0]

const infoContent =

  `<h2>Breed Name Id: ${selectedBreedId}</h2>
    <li>${catImages.name}</li>

  <li>${catImages.length} images are available.</li>`

     if (selectedBreed) {
  //      const breedInfo = firstCatImage.breeds[0];
  //      const infoContent = breedInfo.name;

      infoDump.innerHTML = infoContent;
    }
    else {
      infoDump.innerHTML = "There is no breed information available.";

    }

    //moveCarousels();

  } catch (error) {
    console.error("There is an error fetching images:", error);
    infoDump.innerHTML = "Loading images has failed. Try again."
  }
}

initialLoad();
  




/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */


document.getElementById("breedSelect").addEventListener ("change", async (event) => {
  const selectedBreedId = event.target.value;

  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}&limit=10`, {
      headers: {
        'x-api-key': "live_WlRTVBHIH4AN7yJo2s0Aw3fK5N7QJ7dXF2FrUqUmpArFGhWZ1pP4KIaYnVFSl0WB"
      }
    });
    const carouselInner = document.getElementById("carouselInner");
    carouselInner.innerHTML = "";

    if (Array.isArray(response.data)) {
      //this creates carousel items for each image that is fetched

      response.data.forEach(cat => {
        if (cat && cat.url && cat.id) {
          createCarouselItems(cat);
        }
        else {
          console.error("Cat image data is not valid:", cat);

        }
        
       });
      } else {
        console.error("The response.data has to be array:", response.data);

      }

    } catch (error) {
      console.error("Error fetching the breed images:", error);
    }

});






/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

async function getFavourites() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/favourites", {
      headers: {
        'x-api-key': "live_WlRTVBHIH4AN7yJo2s0Aw3fK5N7QJ7dXF2FrUqUmpArFGhWZ1pP4KIaYnVFSl0WB"
      }
    });
    const carouselInner = document.getElementById("carouselInner");
    carouselInner.innerHTML = ""; // this clears the existing carousel items

    if (response.data && response.data.length > 0) {
      response.data.forEach((favImage, index) => {
        createCarouselItems(favImage.image, index === 0);
      });
    } else {
      console.log("There are no favourites found here.")
    }

  } catch (error) {
    console.error("There is error while fetching favourites:", error);
  }
}

// now adding the event listener in the Get Favoutites button 
document.getElementById("getFavouritesBtn").addEventListener("click", getFavourites);



/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */

async function getBreedInfo(breedId) {
  try {
  const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
      headers: {
        'x-api-key': "live_WlRTVBHIH4AN7yJo2s0Aw3fK5N7QJ7dXF2FrUqUmpArFGhWZ1pP4KIaYnVFSl0WB"
      }
    });

    const breedInfo = response.data;

    if (breedInfo.length > 0) {
      const breed = breedInfo[0];
      if (breed.breeds && breed.breeds.length > 0) {
        const breedDetails = breed.breeds[0];
        console.log("Breed Details:", breedDetails);
        return breed;
      }else {
        console.log("There are no data available for this particular image.")
        return null;
      }


    }
  } catch (error) {
    console.error("There has been error while fetching the breed data here:", error);
  }
}





// to test the breed whose images are not available

async function getBreedById(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/${breedId}`, {
      headers: {
        'x-api-key': "live_WlRTVBHIH4AN7yJo2s0Aw3fK5N7QJ7dXF2FrUqUmpArFGhWZ1pP4KIaYnVFSl0WB"
      }
    });

    console.log(response.data);
  }catch (error) {
    console.error("There has been error while fetching breed data:", error);

  }
}
//Malayan
getBreedById(78);