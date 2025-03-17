// Card data
const cardsData = [
  {
    category: "Personalized Hydration Plans",
    title: "Customized Water Intake Recommendations Just for You",
    src: "https://images.unsplash.com/photo-1516888892881-aad840c56db2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGh5ZHJhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    content: `
      <p>Understanding that each individual's hydration needs are unique, "Get Daily Drink" offers a personalized hydration calculator. By considering factors such as gender, age, health conditions, pregnancy status, physical activity levels, smoking, and drinking habits, our algorithm provides tailored daily water intake recommendations. This customization ensures that you receive guidance suited to your specific lifestyle, promoting optimal health and well-being.</p>
    `,
    sources: [
      "The Harvard T.H. Chan School of Public Health provides general recommendations for daily water intake, highlighting that individual needs vary based on age, gender, and life stages such as pregnancy and breastfeeding. <a href='https://www.hsph.harvard.edu/nutritionsource/water/'>Read More</a>",
      "A study published in the Journal of the International Society of Sports Nutrition found that tailored hydration plans, based on an individual's fluid and sodium loss, can improve performance outcomes, emphasizing the importance of personalized hydration strategies. <a href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5790864/'>Read More</a>",
    ],
  },
  {
    category: "Cross-Platform Accessibility",
    title: "Stay Hydrated with Our Android and iOS Apps",
    src: "https://images.unsplash.com/photo-1541345023926-55d6e0853f4b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: `
      <p>In today's fast-paced world, having access to your health tools across multiple devices is crucial. "Get Daily Drink" offers dedicated applications for both Android and iOS platforms, ensuring you can monitor and manage your hydration goals wherever you are. Whether you're using a smartphone or tablet, our user-friendly interface provides a seamless experience, making it easier than ever to stay on top of your hydration needs.</p>
    `,
    sources: [
      "A UX case study on hydration improvement apps emphasizes the importance of cross-platform accessibility, noting that users benefit from tracking their water intake and receiving reminders across various devices, which promotes better hydration habits. <a href='https://medium.com/'>Read More</a>",
    ],
  },
  {
    category: "Timely Email Reminders",
    title: "Gmail Notifications to Keep You on Track",
    src: "./Images/gmail-push.jpg",
    content: `
      <p>Maintaining consistent hydration can be challenging amidst a busy schedule. To support you, "Get Daily Drink" integrates with Gmail to send you timely push notifications. These gentle reminders prompt you to drink water at optimal intervals throughout the day, helping you develop and maintain healthy hydration habits without the need to constantly check the app.</p>
    `,
    sources: [
      "A study highlighted in Frontiers in Nutrition found that personalized hydration strategies, which can include timely reminders, help maintain fluid balance and improve exercise performance, underscoring the effectiveness of regular prompts to drink water. <a href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5790864/'>Read More</a>",
      "The Better Health Channel emphasizes that regular fluid intake is essential for maintaining physiological functions, and timely reminders can aid in achieving adequate hydration. <a href='https://www.betterhealth.vic.gov.au/'>Read More</a>",
    ],
  },
  {
    category: "Weekly Hydration Insights",
    title: "Understand and Improve Your Drinking Habits",
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: `
      <p>Gaining insight into your hydration patterns is key to making informed health decisions. "Get Daily Drink" provides weekly summaries of your water intake, highlighting trends and areas for improvement. These insights empower you to adjust your habits, set achievable goals, and celebrate your progress, all of which contribute to sustained hydration and overall health.</p>
    `,
    sources: [
      "The Centers for Disease Control and Prevention (CDC) reports that plain water consumption varies by age, race/ethnicity, and socioeconomic status, indicating the importance of personalized hydration insights to address individual needs. <a href='https://www.cdc.gov/'>Read More</a>",
      "Research published in Physiopedia highlights that proper hydration is vital for maintaining physiological functions, thermoregulation, and optimal performance, suggesting that monitoring and insights can support these outcomes. <a href='https://www.physio-pedia.com/'>Read More</a>",
    ],
  },
  {
    category: "Prevent Common Chronic Diseases",
    title: "Stay Hydrated to Reduce Health Risks and Boost Longevity",
    src: "https://images.unsplash.com/photo-1559234938-b60fff04894d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: `
      <p>Proper hydration plays a crucial role in preventing common chronic diseases. Research indicates that maintaining adequate hydration can lower the risk of developing conditions such as kidney stones, urinary tract infections, and hypertension. By ensuring you drink sufficient water daily, "Get Daily Drink" supports your efforts to maintain optimal health and reduce the likelihood of these chronic ailments.</p>
    `,
    sources: [
      "Research indicates that maintaining adequate hydration can lower the risk of developing conditions such as kidney stones, urinary tract infections, and hypertension. <a href='https://en.wikipedia.org/wiki/'>Read More</a>",
    ],
  },
  {
    category: "Enhance Cognitive Function and Academic Performance",
    title: "Boost Your Brainpower with Proper Hydration",
    src: "https://images.unsplash.com/photo-1536925155833-43e9c2b2f499?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: `
      <p>Hydration significantly impacts cognitive processes and academic performance. Studies have shown that even mild dehydration can impair attention, memory, and mood. By promoting regular water intake, "Get Daily Drink" helps enhance concentration, alertness, and overall cognitive function, leading to improved academic and work performance.</p>
    `,
    sources: [
      "Studies have shown that even mild dehydration can impair attention, memory, and mood. <a href='https://pubmed.ncbi.nlm.nih.gov/'>Read More</a>",
    ],
  },
];

const callToAction = document.createElement("h3");
callToAction.innerHTML = `Struggling to stay hydrated? Get your ideal daily intake in seconds! <a class="cta-btn" href="form">Discover your needs</a>
      `;

// DOM elements
const carouselInner = document.getElementById("carousel-inner");
const carousel = document.getElementById("carousel");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");
const closeModal = document.getElementById("close-modal");
const modalCategory = document.getElementById("modal-category");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

// State
let currentIndex = 0;
let cards = [];

function generateContent(index) {
  let content = "";
  const card = cardsData[index];

  // Add modal content
  content += `<div class="content-block">${card.content}</div>`;

  // Add empirical support
  if (card.sources && card.sources.length > 0) {
    content += `<div class="sources-block"><h4>Read More:</h4><ul>`;
    card.sources.forEach((source) => {
      content += `<li>${source}</li>`;
    });
    content += `</ul></div>`;
  }

  return content;
}

// Initialize carousel
function initCarousel() {
  // Create cards
  cardsData.forEach((data, index) => {
    const card = document.createElement("div");
    card.className = `carousel-card ${index === currentIndex ? "active" : ""}`;
    card.dataset.index = index;

    card.innerHTML = `
                
                <div class="carousel-card-gradient"></div>
                <a class="cta-btn" style="top: 50%">Read More</a>
                <div class="carousel-card-content">
                    <p class="carousel-card-category">${data.category}</p>
                    <h3 class="carousel-card-title">${data.title}</h3>
                    
                </div>
                <img src="${data.src}" alt="${data.title}" class="carousel-card-image">            
            `;

    card.addEventListener("click", () => openModal(index));
    carouselInner.appendChild(card);
    cards.push(card);
  });

  // Add padding to the end for better UX
  const endPadding = document.createElement("div");
  endPadding.style.width = "33%";
  endPadding.style.flexShrink = "0";
  carouselInner.appendChild(endPadding);

  // Center the first card
  updateCarouselPosition();

  // Add scroll event listener
  carousel.addEventListener("scroll", handleScroll);
}

// Update carousel position to center the active card
function updateCarouselPosition() {
  const card = cards[currentIndex];
  const cardWidth = card.offsetWidth;
  const cardLeft = card.offsetLeft;
  const carouselWidth = carousel.offsetWidth;

  // Calculate the scroll position to center the card
  const scrollPosition = cardLeft - carouselWidth / 2 + cardWidth / 2;

  // Scroll to the position
  carousel.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });

  // Update active class
  cards.forEach((c, i) => {
    if (i === currentIndex) {
      c.classList.add("active");
    } else {
      c.classList.remove("active");
    }
  });

  // Update button states
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === cards.length - 1;
}

// Handle scroll event
function handleScroll() {
  // Find which card is closest to the center
  const carouselRect = carousel.getBoundingClientRect();
  const carouselCenter = carouselRect.left + carouselRect.width / 2;

  let closestIndex = 0;
  let closestDistance = Infinity;

  cards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const distance = Math.abs(cardCenter - carouselCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  // Update current index if changed
  if (closestIndex !== currentIndex) {
    currentIndex = closestIndex;

    // Update active class
    cards.forEach((c, i) => {
      if (i === currentIndex) {
        c.classList.add("active");
      } else {
        c.classList.remove("active");
      }
    });

    // Update button states
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === cards.length - 1;
  }
}

// Navigate to previous card
function goToPrevCard() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarouselPosition();
  }
}

// Navigate to next card
function goToNextCard() {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateCarouselPosition();
  }
}

// Open modal with card details
function openModal(index) {
  modalCategory.textContent = cardsData[index].category;
  modalTitle.textContent = cardsData[index].title;
  modalBody.innerHTML = generateContent(index);
  modalBody.appendChild(callToAction);
  modal.style.display = "flex";
  modalContent.classList.add("show");
}

// Close modal
function closeModalHandler() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  modalContent.classList.remove("show");
}

// Event listeners
prevButton.addEventListener("click", goToPrevCard);
nextButton.addEventListener("click", goToNextCard);
closeModal.addEventListener("click", closeModalHandler);

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModalHandler();
  }
});

// Initialize
initCarousel();

// Toggle dark mode (optional)
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
