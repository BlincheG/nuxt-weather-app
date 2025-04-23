# Weather App

This is a simple weather app built with **Vue.js & Nuxt 3** as part of a test task for the company **SunFinance**.   
The app helps you find the weather in different cities.

## Features

- Search cities by name  
- View weather details for the selected city  
- Switch between Celsius and Fahrenheit  
- Loading spinner while fetching data  
- Error messages if something goes wrong  
- City search cache to make it faster

## Components

The app has two main parts:

1. **Search Component**  
   - You can type a city name  
   - It shows a list of matching cities  

2. **Weather Component**  
   - Shows temperature and weather info for the selected city  

## Setup

Before running the app, create a `.env` file in the root folder.  
You can use `.env.example` as a guide.

Then install dependencies and run the development server:

```bash
npm install
npm run dev

**Built With**

- Vue 3
- TypeScript
- OpenWeatherMap API