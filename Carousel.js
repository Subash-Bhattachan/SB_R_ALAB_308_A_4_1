import * as bootstrap from "bootstrap";
import { favourite } from "./index.js";

const API_KEY =
  "live_WlRTVBHIH4AN7yJo2s0Aw3fK5N7QJ7dXF2FrUqUmpArFGhWZ1pP4KIaYnVFSl0WB";


export function createCarouselItem(imgSrc, imgAlt, imgId) {
  const template = document.querySelector("#carouselItemTemplate");
  const clone = template.content.firstElementChild.cloneNode(true);

  const img = clone.querySelector("img");
  img.src = imgSrc;
  img.alt = imgAlt;

  const favBtn = clone.querySelector(".favourite-button");
  favBtn.addEventListener("click", () => {
    addFavourite(imgId);
  });

  return clone;
}

export function clear() {
  const carousel = document.querySelector("#carouselInner");
  while (carousel.firstChild) {
    carousel.removeChild(carousel.firstChild);
  }
}

export function appendCarousel(element) {
  const carousel = document.querySelector("#carouselInner");

  const activeItem = document.querySelector(".carousel-item.active");
  if (!activeItem) element.classList.add("active");

  carousel.appendChild(element);
}

export function start() {
  const multipleCardCarousel = document.querySelector(
    "#carouselExampleControls"
  );
  if (window.matchMedia("(min-width: 768px)").matches) {
    const carousel = new bootstrap.Carousel(multipleCardCarousel, {
      interval: false
    });
    const carouselWidth = $(".carousel-inner")[0].scrollWidth;
    const cardWidth = $(".carousel-item").width();
    let scrollPosition = 0;
    $("#carouselExampleControls .carousel-control-next").unbind();
    $("#carouselExampleControls .carousel-control-next").on(
      "click",
      function () {
        if (scrollPosition < carouselWidth - cardWidth * 4) {
          scrollPosition += cardWidth;
          $("#carouselExampleControls .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600
          );
        }
      }
    );
    $("#carouselExampleControls .carousel-control-prev").unbind();
    $("#carouselExampleControls .carousel-control-prev").on(
      "click",
      function () {
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth;
          $("#carouselExampleControls .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600
          );
        }
      }
    );
  } else {
    $(multipleCardCarousel).addClass("slide");
  }
}


export async function addFavourite(catImageId) {
  const favEndpoint = `https://api.thecatapi.com/v1/favourites`;
  const headers = { 'x-api-key': "live_WlRTVBHIH4AN7yJo2s0Aw3fK5N7QJ7dXF2FrUqUmpArFGhWZ1pP4KIaYnVFSl0WB",
                  'Content-Type': 'application/json'
   };

  try{
  const response = await axios.get(favEndpoint, { headers });
  const groupOfFavourites = response.data;

// to check if the image is alraedy picked in the favourite list
  const isPickedasFavourite = groupOfFavourites.find(fav => fav.image.id === catImageId);


  if (isPickedasFavourite) {
    // if it is then remove it
    await axios.delete(`${favEndpoint}/${isPickedasFavourite.id}`, { headers });
    console.log(`Removed favourite for image ID: ${catImageId}`);
  }
    else {
      // else then add to the list
      await axios.post(favEndpoint, {
        image_id: catImageId}, { headers }); 
      
      console.log(`Image ID of added favourite: ${catImageId}`)

    }
  }catch(error) {
    console.log("There is some error in adding the favourite  status to image", error);
  }

  }



  

  export function createCarouselItems(catImage) {
    const imgElement = document.createElement("img");
    //imgElement.src = catImage.url;
    imgElement.alt = "Cat";

    // adding check to make sure that the data is available or not
    if (catImage && catImage.url) {
      imgElement.src = catImage.url;

    }else {
      imgElement.src = "./cat.jpg";
    }
  
    // this will create the favourite heart button
    const favouriteButton = document.createElement("button");
    favouriteButton.innerHTML = '❤️'; // using as a demarcation
    favouriteButton.className = "favourite-button";
  
    // now adding event listener 
    favouriteButton.addEventListener("click", () => {
      addFavourite(catImage.id);
    });

    // checking for breed description
    const breedDescription = catImage.breeds && catImage.breeds.length > 0 ? catImage.breeds[0].description : "There is no description available";
    const descriptionElement = document.createElement("div");
    descriptionElement.className = "breed-description";
    descriptionElement.innerHTML = breedDescription;

  
    // now appending the image and button to the single item
    const carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item";
    carouselItem.appendChild(imgElement);
    carouselItem.appendChild(favouriteButton);
  
    // adding to the carousel finally
    document.getElementById("carouselInner").appendChild(carouselItem); 
  
  }
  