# Countries API Database Application

This Flask application fetches random countries from the [REST Countries API](https://restcountries.com/) and stores them in a SQLite database.

## Features

- Fetches 10 random countries from the REST Countries API
- Stores country data with the following attributes:
  - **name**: Country name
  - **capital**: Country capital
  - **flag**: URL to country flag image
  - **subregion**: Country subregion
  - **population**: Country population
- Provides REST API endpoints to interact with the data
- SQLite database for data persistence

## Setup Instructions

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the application:**
   ```bash
   python app.py
   ```

3. **Access the application:**
   - Open your browser and go to `http://localhost:5000`
   - The application will automatically initialize the database

## API Endpoints

### 1. Home Page (`/`)
- Displays information about the application and available endpoints
- Provides links to all available routes

### 2. Fetch Countries (`/fetch-countries`)
- **Method:** GET
- **Description:** Fetches 10 random countries from the REST Countries API and saves them to the database
- **Response:** JSON with success message and list of saved countries

### 3. View Countries (`/countries`)
- **Method:** GET
- **Description:** Retrieves all countries stored in the database
- **Response:** JSON with total count and list of all countries

### 4. Clear Database (`/clear-database`)
- **Method:** GET
- **Description:** Removes all data from the database
- **Response:** JSON confirmation message

## Database Schema

The application creates a `countries.db` SQLite database with the following table structure:

```sql
CREATE TABLE countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    capital TEXT,
    flag TEXT,
    subregion TEXT,
    population INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Example Usage

1. **Start the application:**
   ```bash
   python app.py
   ```

2. **Fetch random countries:**
   - Visit `http://localhost:5000/fetch-countries` in your browser
   - Or use curl: `curl http://localhost:5000/fetch-countries`

3. **View stored countries:**
   - Visit `http://localhost:5000/countries` in your browser
   - Or use curl: `curl http://localhost:5000/countries`

4. **Clear the database:**
   - Visit `http://localhost:5000/clear-database` in your browser
   - Or use curl: `curl http://localhost:5000/clear-database`

## Error Handling

The application includes comprehensive error handling for:
- API request failures
- Database connection issues
- Data parsing errors
- Invalid country data

## Dependencies

- **Flask**: Web framework for creating the REST API
- **requests**: HTTP library for making API calls to REST Countries API
- **sqlite3**: Built-in Python module for database operations
- **random**: Built-in Python module for selecting random countries

## Notes

- The application uses the REST Countries API v3.1 endpoint: `https://restcountries.com/v3.1/all`
- Each time you call `/fetch-countries`, it will fetch 10 different random countries
- The database file (`countries.db`) will be created automatically in the same directory as the application
- The application runs on port 5000 by default 