export async function calculate_average(date: string, weather_data: any) {
	//PLACEHOLDER VARIABLES
	//To be passed by the form/DOM to find which stat is requested
	let search_month = date.slice(5, 7);

	//function get_search_strings(month: string, stat: string) {
	//    let months = {
	//        'January'  : "01",
	//        'February' : "02",
	//        'March'    : "03",
	//        'April'    : "04",
	//        'May'      : "05",
	//        'June'     : "06",
	//        'July'     : "07",
	//        'August'   : "08",
	//        'September': "09",
	//        'October'  : "10",
	//        'November' : "11",
	//        'December' : "12",
	//    }
	//    let stats = {
	//        'Temperature' : "T2M",
	//        'Precipitation' : "PRECTOTCORR",
	//        'Cloudiness' : 'CLOUD_AMT_DAY'
	//    }
	//    return [months[month], stats[stat]];
	//};

	//let [search_month, search_stat] = get_search_strings(entered_month, entered_stat);
	//console.log(search_month, search_stat);

	function calc_avg(stat, entries) {
		console.log(stat / entries);
		return stat / entries;
	}

	let avg_stat = 0;
	let vaild_entries = 0;

	let avg_data = {
		CLOUD_AMT_DAY: 0,
		PRECTOTCORR: 0,
		T2M: 0
	};

	Object.entries(weather_data).forEach((stat) => {
		Object.entries(stat[1]).forEach((month) => {
			if (search_month == month[0].slice(4, 6)) {
				if (month[1] != -999) {
					vaild_entries++;
					avg_stat += month[1];
				}
			}
		});
		avg_data[stat[0]] = calc_avg(avg_stat, vaild_entries);
		avg_stat = 0;
		vaild_entries = 0;
	});

	console.log('AVERAGE CLOUD: ' + avg_data.CLOUD_AMT_DAY);
	console.log('AVERAGE TEMP: ' + avg_data.T2M);
	console.log('AVERAGE PRECIP: ' + avg_data.PRECTOTCORR);

	return avg_data;
}
