document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("languageSelector");

  const translations = {
    en: {
      chatLabel:       "Live Chat",
      bookingTitle:    "Book Your Ride",
      mapTitle:        "Our Locations",
      mapHeadOffice:   "Head Office",
      mapServiceCenters: "Service Centers",
      logoText:        "My Transport & Logistics",
      navServices:     "Services",
      navBooking:      "Book a Ride",
      navMap:          "Map",
      navDashboard:    "Dashboard",
      navLogin:        "Login",
      navRegister:     "Register",
      heroTitle:       "Ride with Excellence",
      heroSubtitle:    "Your Reliable Partner in Transport & Logistics",
      heroBookNow:     "Book Now",
      heroExplore:     "Explore Services",
      whyTitle:        "Why Choose Us",
      why1Title:       "24/7 Availability",
      why1Desc:        "Round-the-clock service with instant booking options.",
      why2Title:       "Verified Drivers",
      why2Desc:        "Professional drivers with excellent safety records.",
      why3Title:       "Real-time Tracking",
      why3Desc:        "Track your ride in real-time with our advanced system.",
      servicesTitle:   "Our Services",
      svc1Title:       "Fast Pickup",
      svc1Desc:        "Experience rapid and reliable ride pickups anytime, anywhere.",
      svc2Title:       "Safe Journey",
      svc2Desc:        "Safety is our priority with well-trained drivers and secure rides.",
      svc3Title:       "Logistics Solutions",
      svc3Desc:        "Seamless logistics support tailored for your business needs.",
      toggleTheme:     "Toggle Theme",
      footerText:      "© 2025 My Transport & Logistics. All Rights Reserved.",
      bookingPickup:     "Select Pickup District",
      bookingDrop:       "Select Drop District",
      bookingDate:       "Date",
      bookingDistance:   "Distance (km)",
      bookingCalc:       "Calculate Fare",
      bookingFareResult: "Fare: $",
      bookingSubmit:     "Book Now",
      bookingProceed:    "Proceed to Payment",
      mapHeadOffice:     "Head Office",
      mapServiceCenters: "Service Centers",
      chatHeader:        "MyTransport Support",
      chatInitial:       "Hi there! I'm here to help with any questions about MyTransport services. How can I assist you today?",
      chatSend:          "Send"
    },
    hi: {
      chatLabel:       "लाइव चैट",
      bookingTitle:    "सवारी बुक करें",
      mapTitle:        "हमारे स्थान",
      mapHeadOffice:   "मुख्य कार्यालय",
      mapServiceCenters: "सेवा केंद्र",
      logoText:        "माइ ट्रांसपोर्ट एंड लॉजिस्टिक",
      navServices:     "सेवाएं",
      navBooking:      "सवारी बुक करें",
      navMap:          "मानचित्र",
      navDashboard:    "डैशबोर्ड",
      navLogin:        "लॉगिन",
      navRegister:     "रजिस्टर",
      heroTitle:       "उत्कृष्ट सवारी करें",
      heroSubtitle:    "परिवहन और लॉजिस्टिक्स में आपका विश्वसनीय साथी",
      heroBookNow:     "अब बुक करें",
      heroExplore:     "सेवाएं खोजें",
      whyTitle:        "क्यों चुनें",
      why1Title:       "24/7 उपलब्धता",
      why1Desc:        "24 घंटे की सेवा और तत्काल बुकिंग विकल्प।",
      why2Title:       "सत्यापित ड्राइवर",
      why2Desc:        "उत्कृष्ट सुरक्षा रिकॉर्ड वाले पेशेवर ड्राइवर।",
      why3Title:       "वास्तविक समय में ट्रैकिंग",
      why3Desc:        "अपनी सवारी को वास्तविक समय में ट्रैक करें।",
      servicesTitle:   "हमारी सेवाएं",
      svc1Title:       "तेजी से उठाना",
      svc1Desc:        "कहीं-भी कभी-भी तेज़ और भरोसेमंद सवारी उठाएं।",
      svc2Title:       "सुरक्षित यात्रा",
      svc2Desc:        "अच्छी तरह प्रशिक्षित ड्राइवर और सुरक्षित सवारी।",
      svc3Title:       "लॉजिस्टिक्स समाधान",
      svc3Desc:        "आपके व्यवसाय की आवश्यकताओं के लिए अनुकूलित समाधान।",
      toggleTheme:     "थीम बदलें",
      footerText:      "© 2025 माइ ट्रांसपोर्ट एंड लॉजिस्टिक. सभी अधिकार सुरक्षित।",
      bookingPickup:   "पिकअप जिला चुनें",
      bookingDrop:     "ड्रॉप जिला चुनें",
      bookingDate:     "तारीख",
      bookingDistance: "दूरी (किमी)",
      bookingCalc:     "किराया गणना करें",
      bookingFareResult: "किराया: ₹",
      bookingSubmit:   "अग्रेकरण के लिए आगे बढ़ें",
      bookingProceed:  "भुगतान के लिए आगे बढ़ें",
      mapHeadOffice:   "मुख्य कार्यालय",
      mapServiceCenters: "सेवा केंद्र",
      chatHeader:      "MyTransport सहायता",
      chatInitial:     "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?",
      chatSend:        "भेजें"
    },
    kn: {
      chatLabel:       "ನಿರಂತರ ಚಾಟ",
      bookingTitle:    "ಸವಾರಿ ಬುಕ್ ಮಾಡಿ",
      mapTitle:        "ನಮ್ಮ ಸ್ಥಳಗಳು",
      mapHeadOffice:   "ಮುಖ್ಯ ಕಾರ್ಯಾಲಯ",
      mapServiceCenters: "ಸೇವಾ ಕೇಂದ್ರಗಳು",
      logoText:        "ನನ್ನ ಪರಿವಹನ ಮತ್ತು ಲಾಜಿಸ್ಟಿಕ್ಸ್",
      navServices:     "ಸೇವೆಗಳು",
      navBooking:      "ಸವಾರಿ ಬುಕ್ ಮಾಡಿ",
      navMap:          "ಮಾಪ್",
      navDashboard:    "ಡಾಶ್‌ಬೋರ್ಡ್",
      navLogin:        "ಲಾಗಿನ್",
      navRegister:     "ರಜಿಸ್ಟರ್",
      heroTitle:       "ಅತ್ಯುತ್ತಮ ಪ್ರಯಾಣ",
      heroSubtitle:    "ನಿಮ್ಮ ನಂಬಬಹುದಾದ ಪಾಲುದಾರ",
      heroBookNow:     "ಈಗ ಬುಕ್ ಮಾಡಿ",
      heroExplore:     "ಸೇವೆಗಳನ್ನು ತಿಳಿಯಿರಿ",
      whyTitle:        "ಏಕೆ ನಮಗೆ ಆಯ್ಕೆ",
      why1Title:       "24/7 ಲಭ್ಯತೆ",
      why1Desc:        "ಯಾವಾಗದಾದರೂ ಸೇವೆಗಳು ಮತ್ತು ತಕ್ಷಣದ ಬುಕ್ಕಿಂಗ್.",
      why2Title:       "ನಿರೀಕ್ಷಿತ ಚಾಲಕರು",
      why2Desc:        "ಚಿಕಿತ್ಸಿತ ಚಾಲಕರಿಂದ ಸುರಕ್ಷಿತ ಪ್ರಯಾಣ.",
      why3Title:       "ವಾಸ್ತವಿಕ ಸಮಯ ಟ್ರ್ಯಾಕ್",
      why3Desc:        "ನಿಮ್ಮ ಸವಾರಿ ನೇರವಾಗಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
      servicesTitle:   "ನಮ್ಮ ಸೇವೆಗಳು",
      svc1Title:       "ವೇಗದ ಸುಲಭತೆ",
      svc1Desc:        "ಎಲ್ಲಿ ಬೇಕಾದರೂ ವೇಗದ ಹಿಡಿತ.",
      svc2Title:       "ಭದ್ರ ಯಾತ್ರೆ",
      svc2Desc:        "ಉತ್ತಮ ಸುರಕ್ಷಿತ ಚಾಲಕರು.",
      svc3Title:       "ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪರಿಹಾರ",
      svc3Desc:        "ವ್ಯವಹಾರದ ಅವಶ್ಯಕತೆಗಳಿಗೆ.",
      toggleTheme:     "ಥೀಮ್ ಬದಲಾಯಿಸು",
      footerText:      " 2025 ನನ್ನ ಪರಿವಹನ ಮತ್ತು ಲಾಜಿಸ್ಟಿಕ್ಸ್. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು محفوظ.",
      bookingPickup:   "ಪಿಕಾಪ್ ಜಿಲ್ಲೆ ಆರಿಸಿ",
      bookingDrop:     "ಡ್ರಾಪ್ ಜಿಲ್ಲೆ ಆರಿಸಿ",
      bookingDate:     "ದಿನಾಂಕ",
      bookingDistance: "ದೂರ (ಕಿಮೀ)",
      bookingCalc:     "ಕಿರಾಯ ಲೆಕ್ಕಿಸಿ",
      bookingFareResult: "ಕಿರಾಯ: ",
      bookingSubmit:   "ಅಗ್ರೇಕರಣ ಮಾಡಿ",
      bookingProceed:  "ಭುಗತಾನ ಮಾಡಿ",
      mapHeadOffice:   "ಮುಖ್ಯ ಕಾರ್ಯಾಲಯ",
      mapServiceCenters: "ಸೇವಾ ಕೇಂದ್ರಗಳು",
      chatHeader:      "MyTransport ಸಂಪರ್ಕ",
      chatInitial:     "ನಮಸ್ಕಾರ! ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
      chatSend:        "ಕಳುಹಿಸು"
    }
  };

  function translatePage(lang) {
    const dict = translations[lang] || translations.en;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      // look up translation, fall back to English, then to the element's existing text
      el.textContent =
        dict[key] ??
        translations.en[key] ??
        el.textContent;
    });
  }

  // initialize from localStorage or default to English
  const saved = localStorage.getItem("currentLanguage") || "en";
  languageSelector.value = saved;
  translatePage(saved);

  languageSelector.addEventListener("change", function() {
    const lang = this.value;
    localStorage.setItem("currentLanguage", lang);
    translatePage(lang);
  });
});
