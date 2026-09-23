const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('projectForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const business = document.getElementById('business').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  const text = [
    'Hi Design Cassette! 👋',
    '',
    `Name: ${name}`,
    business ? `Business / Brand: ${business}` : '',
    `Service: ${service}`,
    message ? `Project details: ${message}` : '',
    '',
    'I would like to discuss this project.'
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/918943027041?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
/* =========================================
   WEB DESIGN BUDGET ESTIMATOR
========================================= */

const websiteOptions = document.querySelectorAll(
  ".website-types .estimate-option"
);

const pageOptions = document.querySelectorAll(
  ".compact-options .estimate-option"
);

const featureOptions = document.querySelectorAll(
  ".feature-option input"
);

const estimateTotal = document.getElementById("estimateTotal");
const estimateSummary = document.getElementById("estimateSummary");
const whatsappEstimate = document.getElementById("whatsappEstimate");

let selectedWebsite = {
  price: 3999,
  name: "Basic Website"
};

let selectedPages = {
  price: 0,
  name: "1–3 Pages"
};


/* WEBSITE TYPE */

websiteOptions.forEach(option => {

  option.addEventListener("click", () => {

    websiteOptions.forEach(item =>
      item.classList.remove("active")
    );

    option.classList.add("active");

    selectedWebsite = {
      price: Number(option.dataset.price),
      name: option.dataset.name
    };

    updateEstimate();

  });

});


/* NUMBER OF PAGES */

pageOptions.forEach(option => {

  option.addEventListener("click", () => {

    pageOptions.forEach(item =>
      item.classList.remove("active")
    );

    option.classList.add("active");

    selectedPages = {
      price: Number(option.dataset.extra),
      name: option.querySelector("strong").textContent
    };

    updateEstimate();

  });

});


/* FEATURES */

featureOptions.forEach(option => {

  option.addEventListener("change", updateEstimate);

});


/* CALCULATE */

function updateEstimate() {

  let total =
    selectedWebsite.price +
    selectedPages.price;

  let selectedFeatures = [];

  featureOptions.forEach(feature => {

    if (feature.checked) {

      total += Number(feature.dataset.extra);

      selectedFeatures.push(
        feature.dataset.feature
      );

    }

  });


  estimateTotal.textContent =
    "₹" + total.toLocaleString("en-IN") + "+";


  let summary =
    selectedWebsite.name +
    " · " +
    selectedPages.name;


  if (selectedFeatures.length) {

    summary +=
      " · " +
      selectedFeatures.length +
      " add-on" +
      (selectedFeatures.length > 1 ? "s" : "");

  }


  estimateSummary.textContent = summary;

}


/* WHATSAPP */

whatsappEstimate.addEventListener("click", () => {

  let total =
    selectedWebsite.price +
    selectedPages.price;

  let selectedFeatures = [];

  featureOptions.forEach(feature => {

    if (feature.checked) {

      total += Number(feature.dataset.extra);

      selectedFeatures.push(
        feature.dataset.feature
      );

    }

  });


  const message = `
Hello Design Cassette 👋

I used your Website Budget Estimator.

Website Type:
${selectedWebsite.name}

Pages:
${selectedPages.name}

Additional Features:
${selectedFeatures.length
    ? selectedFeatures.join(", ")
    : "None"}

Estimated Starting Budget:
₹${total.toLocaleString("en-IN")}+

I'd like to discuss this project further.
  `.trim();


  const whatsappNumber = "918943027041";

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");

});


/* INITIAL CALCULATION */

updateEstimate();