
document.documentElement.classList.add("js-enabled");
/* =========================================
   DESIGN CASSETTE — MAIN JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    open ? "true" : "false"
  );
});


/* Close mobile menu when a navigation link is clicked */

document.querySelectorAll(".nav a").forEach((link) => {

  link.addEventListener("click", () => {

    nav?.classList.remove("open");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* =========================================
   REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observerInstance.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    }
  );


  revealElements.forEach((element) => {
    observer.observe(element);
  });


  /* Make hero visible immediately */

  document
    .querySelectorAll(".hero .reveal")
    .forEach((element) => {
      element.classList.add("visible");
    });

} else {

  /* Fallback for browsers without IntersectionObserver */

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


/* =========================================
   FOOTER YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   PROJECT / WHATSAPP FORM
========================================= */

const projectForm = document.getElementById("projectForm");

if (projectForm) {

  projectForm.addEventListener("submit", function (e) {

    e.preventDefault();


    const name =
      document.getElementById("name")?.value.trim() || "";

    const phone =
      document.getElementById("phone")?.value.trim() || "";

    const service =
      document.getElementById("service")?.value || "";

    const message =
      document.getElementById("message")?.value.trim() || "";


    const whatsappNumber = "918943027041";


    const whatsappMessage = `Hello Design Cassette! 👋

I would like to enquire about your services.

👤 Name: ${name}
📱 Phone: ${phone}
🎨 Service: ${service}

📝 Project Details:
${message || "No additional details provided."}

Looking forward to hearing from you. Thank you!`;


    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;


    window.open(whatsappURL, "_blank");

  });

}


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

const estimateTotal =
  document.getElementById("estimateTotal");

const estimateSummary =
  document.getElementById("estimateSummary");

const whatsappEstimate =
  document.getElementById("whatsappEstimate");


let selectedWebsite = {
  price: 3999,
  name: "Basic Website"
};


let selectedPages = {
  price: 0,
  name: "1–3 Pages"
};


/* =========================================
   WEBSITE TYPE
========================================= */

websiteOptions.forEach((option) => {

  option.addEventListener("click", () => {

    websiteOptions.forEach((item) => {
      item.classList.remove("active");
    });


    option.classList.add("active");


    selectedWebsite = {
      price: Number(option.dataset.price),
      name: option.dataset.name
    };


    updateEstimate();

  });

});


/* =========================================
   NUMBER OF PAGES
========================================= */

pageOptions.forEach((option) => {

  option.addEventListener("click", () => {

    pageOptions.forEach((item) => {
      item.classList.remove("active");
    });


    option.classList.add("active");


    selectedPages = {
      price: Number(option.dataset.extra),
      name:
        option.querySelector("strong")?.textContent ||
        "Selected pages"
    };


    updateEstimate();

  });

});


/* =========================================
   ADDITIONAL FEATURES
========================================= */

featureOptions.forEach((option) => {

  option.addEventListener(
    "change",
    updateEstimate
  );

});


/* =========================================
   CALCULATE ESTIMATE
========================================= */

function updateEstimate() {

  if (!estimateTotal || !estimateSummary) {
    return;
  }


  let total =
    selectedWebsite.price +
    selectedPages.price;


  const selectedFeatures = [];


  featureOptions.forEach((feature) => {

    if (feature.checked) {

      total += Number(
        feature.dataset.extra || 0
      );


      selectedFeatures.push(
        feature.dataset.feature || ""
      );

    }

  });


  estimateTotal.textContent =
    "₹" +
    total.toLocaleString("en-IN") +
    "+";


  let summary =
    selectedWebsite.name +
    " · " +
    selectedPages.name;


  if (selectedFeatures.length) {

    summary +=
      " · " +
      selectedFeatures.length +
      " add-on" +
      (selectedFeatures.length > 1
        ? "s"
        : "");

  }


  estimateSummary.textContent = summary;

}


/* =========================================
   ESTIMATOR WHATSAPP
========================================= */

if (whatsappEstimate) {

  whatsappEstimate.addEventListener(
    "click",
    () => {

      let total =
        selectedWebsite.price +
        selectedPages.price;


      const selectedFeatures = [];


      featureOptions.forEach((feature) => {

        if (feature.checked) {

          total += Number(
            feature.dataset.extra || 0
          );


          selectedFeatures.push(
            feature.dataset.feature || ""
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
${
  selectedFeatures.length
    ? selectedFeatures.join(", ")
    : "None"
}

Estimated Starting Budget:
₹${total.toLocaleString("en-IN")}+

I'd like to discuss this project further.
      `.trim();


      const whatsappNumber =
        "918943027041";


      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          message
        )}`;


      window.open(
        whatsappURL,
        "_blank"
      );

    }
  );

}


/* =========================================
   INITIAL ESTIMATE
========================================= */

updateEstimate();