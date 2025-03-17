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
