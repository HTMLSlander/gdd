<<<<<<< HEAD
const badgeContainer = document.querySelectorAll(".badge-container");

function animateBadge(badge) {
  badge.classList.add("filled");
}

window.addEventListener("scroll", checkBadges);

checkBadges();

function checkBadges() {
  const triggerBottom = (window.innerHeight / 5) * 4;
  console.log(triggerBottom);
  badgeContainer.forEach((badge) => {
    const badgeTop = badge.getBoundingClientRect().top;

    if (badgeTop < triggerBottom) {
      setTimeout(animateBadge(badge), 500);
    }
    console.log(badgeTop);
  });
}
=======
const badgeContainer = document.querySelectorAll(".badge-container");

function animateBadge(badge) {
  badge.classList.add("filled");
}

window.addEventListener("scroll", checkBadges);

checkBadges();

function checkBadges() {
  const triggerBottom = (window.innerHeight / 5) * 4;
  console.log(triggerBottom);
  badgeContainer.forEach((badge) => {
    const badgeTop = badge.getBoundingClientRect().top;

    if (badgeTop < triggerBottom) {
      setTimeout(animateBadge(badge), 500);
    }
    console.log(badgeTop);
  });
}
>>>>>>> 608dd71509624566ea811590ee0a96c94506ae94
