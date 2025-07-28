# Clock

This project is a collection of web-based utilities focused on time, dates, and related calculations. It provides various tools accessible through a central `index.html` hub.

## Features

### 1. Digital Clock
- **File:** `clock.html`, `clock_script.js`
- **Description:** Displays a real-time digital clock, showing the current time.

### 2. Time Calculator
- **File:** `time_calculator.html`, `time_calculator_script.js`
- **Description:** Allows users to perform calculations involving time, such as adding or subtracting durations.

### 3. Age Calculator
- **File:** `age_calculator.html`, `age_calculator_script.js`
- **Description:** Calculates a person's age based on their birth date.

### 4. Dead Calculator
- **File:** `dead_calculator.html`, `dead_calculator_script.js`
- **Description:** A unique calculator that estimates a hypothetical "death date" based on user-provided life expectancy and birth date.

### 5. Location Tracker
- **File:** `location.html`, `location_script.js`
- **Description:** Utilizes browser's geolocation to display the user's current location and potentially local time information.

### 6. Salat Times
- **File:** `salat_times.html`, `salat_times_script.js`
- **Description:** Provides Islamic prayer (Salat) times, likely based on location or a configurable method.

## Technologies Used

-   **HTML5:** For structuring the web pages.
-   **CSS3:** For styling and layout (`style.css`).
-   **JavaScript:** For interactive functionalities and calculations (`*.js` files).
-   **Python:** A Python script (`get_ntp_time.py`) is included, likely for fetching accurate network time protocol (NTP) time, though its direct integration with the web pages might require a backend server or specific setup.

## How to Use

1.  **Clone or Download:** Get the project files to your local machine.
2.  **Open `index.html`:** Navigate to the project directory and open `index.html` in your web browser. This file serves as the main hub for accessing all the different tools.
3.  **Navigate:** Click on the buttons in the `index.html` page to access the individual clock and calculator utilities.

## File Structure

-   `index.html`: The main entry point and navigation hub for all tools.
-   `style.css`: Contains the global styles for the project.
-   `clock.html`: HTML for the digital clock display.
-   `clock_script.js`: JavaScript for the digital clock's functionality.
-   `time_calculator.html`: HTML for the time calculator.
-   `time_calculator_script.js`: JavaScript for the time calculator's logic.
-   `age_calculator.html`: HTML for the age calculator.
-   `age_calculator_script.js`: JavaScript for the age calculator's logic.
-   `dead_calculator.html`: HTML for the dead calculator.
-   `dead_calculator_script.js`: JavaScript for the dead calculator's logic.
-   `location.html`: HTML for the location tracker.
-   `location_script.js`: JavaScript for the location tracker's functionality.
-   `salat_times.html`: HTML for the salat times display.
-   `salat_times_script.js`: JavaScript for the salat times functionality.
-   `get_ntp_time.py`: A Python script for fetching NTP time (requires Python environment to run).
-   `README.md`: This file, providing an overview of the project.
