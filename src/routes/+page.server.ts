import { get_weather_data } from '$lib/server/weather_data';
import { calculate_average } from '$lib/server/get_stats';

const location_coordinates = [59.33459, 18.06324, 'Stockholm'];
const params: string = 'PRECTOTCORR,T2M,CLOUD_AMT_DAY';
const cities = [
	[59.33459, 18.06324, 'Stockholm'],
	[55.60587, 13.00073, 'Malmo'],
	[57.70887, 11.97456, 'Gothenburg']
];
const location_request_url: string = `https://power.larc.nasa.gov/api/temporal/monthly/point?start=2020&end=2025&parameters=${params}&community=ag&longitude=${location_coordinates[0]}&latitude=${location_coordinates[1]}&format=JSON`;

function return_data_by_weather_condition(weather_condition, weather_data) {
	let wanted_weather_data = [];
	if (weather_condition === 'Sunny') {
		for (let weather of weather_data) {
			wanted_weather_data.push([weather.location, weather.CLOUD_AMT_DAY, weather.T2M]);
		}

		return wanted_weather_data.sort((next, previous) => previous[1] - next[1]).reverse();
	} else if (weather_condition === 'Cloudy') {
		for (let weather of weather_data) {
			wanted_weather_data.push([weather.location, weather.CLOUD_AMT_DAY, weather.T2M]);
		}

		return wanted_weather_data.sort((next, previous) => previous[1] - next[1]);
	} else if (weather_condition === 'Rainy') {
		for (let weather of weather_data) {
			wanted_weather_data.push([weather.location, weather.PRECTOTCORR, weather.T2M]);
		}

		return wanted_weather_data.sort((next, previous) => previous[1] - next[1]).reverse();
	}

	return [];
}

export const actions = {
	default: async ({ request }) => {
		const form_data = await request.formData();
		const location = form_data.get('location');
		const sunny = form_data.get('Sunny'); // either null or on, so treat it as such
		const rainy = form_data.get('Rainy');
		const cloudy = form_data.get('Cloudy');
		const weather_conditions = {
			Sunny: sunny,
			Rainy: rainy,
			Cloudy: cloudy
		};

		const preferred_locations = form_data.get('preferred-locations');
		const date = form_data.get('date');

		let average_locations_data = [];

		for (let city of cities) {
			let city_url = `https://power.larc.nasa.gov/api/temporal/monthly/point?start=2020&end=2025&parameters=${params}&community=ag&longitude=${city[0]}&latitude=${city[1]}&format=JSON`;
			let city_weather_data = await get_weather_data(city_url);
			let city_average = await calculate_average(date, city_weather_data, city[2]);
			average_locations_data.push(city_average);
		}

		let ranked_cities = [];

		if (weather_conditions.Sunny === 'on') {
			ranked_cities = return_data_by_weather_condition('Sunny', average_locations_data);
		} else if (weather_conditions.Cloudy === 'on') {
			ranked_cities = return_data_by_weather_condition('Cloudy', average_locations_data);
		} else if (weather_conditions.Rainy === 'on') {
			ranked_cities = return_data_by_weather_condition('Rainy', average_locations_data);
		}

		console.log(ranked_cities);
		return { ranked_cities, success: true };
	}
};
