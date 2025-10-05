import { get_weather_data } from '$lib/server/weather_data';
import { calculate_average } from '$lib/server/get_stats';

const location_coordinates: number[] = [57.7089, 11.9746];
const params: string = 'PRECTOTCORR,T2M,CLOUD_AMT_DAY';
const parks: number[][] = [
	[57.684829, 11.943666],
	[57.695071, 11.983655],
	[57.714538, 11.935598],
	[57.717072, 12.002703]
];
const viewpoints: number[][] = [
	[57.689151, 11.901658],
	[57.696002, 11.955329],
	[57.697003, 11.937536]
];

const location_request_url: string = `https://power.larc.nasa.gov/api/temporal/monthly/point?start=2020&end=2025&parameters=${params}&community=ag&longitude=${location_coordinates[0]}&latitude=${location_coordinates[1]}&format=JSON`;

export const actions = {
	default: async ({ request }) => {
		const form_data = await request.formData();
		const location = form_data.get('location');
		const sunny = form_data.get('Sunny'); // either null or on, so treat it as such
		const rainy = form_data.get('Rainy');
		const cloudy = form_data.get('Cloudy');
		const windy = form_data.get('Windy');
		const preferred_locations = form_data.get('preferred-locations');
		const date = form_data.get('date');

		const location_weather_data = await get_weather_data(location_request_url);

		let location_average = await calculate_average(date, location_weather_data);

		let average_locations_data = [];

		for (let location of parks) {
			let temp_url = `https://power.larc.nasa.gov/api/temporal/monthly/point?start=2020&end=2025&parameters=${params}&community=ag&longitude=${location[0]}&latitude=${location[1]}&format=JSON`;
			let temp_weather_data = await get_weather_data(temp_url);
			let temp_average = await calculate_average(date, temp_weather_data);
			average_locations_data.push(temp_average);
		}

		console.log(average_locations_data);
	}
};
