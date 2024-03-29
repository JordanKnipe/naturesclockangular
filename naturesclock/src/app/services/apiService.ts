// apiService.js

const BASE_URL = 'https://wfdr3qbkoi.execute-api.ap-southeast-2.amazonaws.com/WeatherAPI';


  // apiService.js

  export const fetchVegetablesAndHerbs = async (weekNumber:number, year:number, location:string, latitude:number, longitude:number) => {
    try {
      const token = localStorage.getItem('id_token');
      
      // Ensure all parameters passed to URLSearchParams are strings
      const queryParams = new URLSearchParams({
          week_number: weekNumber.toString(),
          year: year.toString(),
          location,
          latitude: latitude.toString(),
          longitude: longitude.toString()
      }).toString();
      console.log(queryParams)
      console.log(`${BASE_URL}?${queryParams}`);
      const response = await fetch(`${BASE_URL}?${queryParams}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      return [];
  }
};




