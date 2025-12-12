
# AI Object Recognizer (Dual-Model Architecture)

A smart web application that identifies objects in uploaded images using **two separate Neural Networks** running simultaneously in the browser.

This project demonstrates how to combine a general-purpose AI with a custom-trained model to achieve high-accuracy object detection without a backend server.

## Key Features

  * **Dual-Brain Architecture:** Runs two AI models in parallel using `Promise.all` for maximum performance.
    1.  **MobileNet (General Brain):** Recognizes 1,000+ generic everyday objects (e.g., "Monitor," "Coffee Mug," "Cell Phone").
    2.  **Custom Model (Specialized Brain):** Trained via Google Teachable Machine to recognize specific characters (Tanjiro Kamado) and documents (Certificates), with a "Nothing/Background" class to reduce false positives.
  * **Smart Filtering:** Custom logic filters out low-confidence guesses (\< 81%) and ignores "Nothing" class results to prevent hallucinations.
  * **Performance Optimized:** Uses versioned caching strategies (`v=1`) to ensure instant reloads after the first visit.
  * **Responsive Design:** Works perfectly on desktop and mobile devices.

## Tech Stack

  * **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+)
  * **AI Libraries:**
      * TensorFlow.js
      * MobileNet
      * Teachable Machine Image

## How It Works

1.  **Initialization:** On load, the app fetches both the MobileNet model and the Custom Teachable Machine model from Google's servers simultaneously.
2.  **User Input:** The user uploads an image via the file input.
3.  **Preprocessing:** The image is converted to a blob URL and displayed in the preview box.
4.  **Analysis:**
      * **Step 1:** The **Custom Model** scans the image. If it detects "Tanjiro" or a "Certificate" with \>81% confidence, it displays a **Purple** result.
      * **Step 2:** The **MobileNet Model** scans the image and provides a list of generic object guesses (displayed in standard text).
5.  **Result Generation:** The DOM is dynamically updated with the confidence scores.

## Project Structure

```bash
ai-object-recognizer/
├── index.html       # Main structure and library imports
├── style.css        # Styling, animations, and responsive layout
├── script.js        # Logic for loading models and classifying images
└── README.md        # Project documentation
```

## Lessons Learned

  * Implemented **Asynchronous JavaScript (async/await)** to handle AI model loading states.
  * Learned **Hard Negative Mining** to fix AI hallucinations (teaching the AI what "Nothing" looks like).
  * Mastered **DOM Manipulation** to dynamically create list items based on prediction arrays.
  * Deployed a static web app using **GitHub** and **Vercel**.
