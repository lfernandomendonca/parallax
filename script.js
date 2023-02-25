
const trackImg = document.getElementById("image-track");
const handleOnDown = (e) => (trackImg.dataset.mouseDownAt = e.clientX);
const handleOnUp = () => {
  trackImg.dataset.mouseDownAt = "0";
  trackImg.dataset.prevPercentage = trackImg.dataset.percentage;
};
const handleOnMove = (e) => {
  if (trackImg.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(trackImg.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(trackImg.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  trackImg.dataset.percentage = nextPercentage;

  trackImg.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of trackImg.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);
