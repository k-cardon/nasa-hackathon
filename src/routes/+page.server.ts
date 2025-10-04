import { get_weather_data } from '$lib/server/weather_data';

const locationCoordinates: number[] = [57.7089, 11.9746];
const params: string = 'PRECSNO,PRECTOTCORR,PSH,WS50M_RANGE,T2M,CLOUD_AMT_DAY';
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

const location_request_url: string = `https://power.larc.nasa.gov/api/temporal/monthly/point?start=2020&end=2025&parameters=${params}&community=ag&longitude=${locationCoordinates[0]}&latitude=${locationCoordinates[1]}&format=JSON`;

export const actions = {
	default: async ({ request }) => {
		const form_data = await request.formData();
		const location = form_data.get('location');
		const sunny = form_data.get('Sunny'); // either null or on, so treat it as such
		const rainy = form_data.get('Rainy');
		const cloudy = form_data.get('Cloudy');
		const windy = form_data.get('Windy');
		const preferred_locations = form_data.get('preferred-locations');

		console.log(await get_weather_data(location_request_url));
		console.log(location, sunny, rainy, cloudy, windy, preferred_locations);
	}
};
