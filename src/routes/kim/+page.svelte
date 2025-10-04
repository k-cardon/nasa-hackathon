<h1 class="text-3xl font-bold center mx-10 mt-10 p-5">Will It Rain On My Parade?</h1>
<p class="mx-10 p-5">NASA Hackathon 2025</p>
<script lang="ts">
    import dater from './message.json';
    //PLACEHOLDER VARIABLES
    //To be passed by the form/DOM to find which stat is requested.
    let entered_stat = "Precipitation"
    let entered_month = "November";
    
    
    function get_search_strings(month: string, stat: string) {
        let months = {
            'January'  : "01",
            'February' : "02",
            'March'    : "03",
            'April'    : "04",
            'May'      : "05",
            'June'     : "06",
            'July'     : "07",
            'August'   : "08",
            'September': "09",
            'October'  : "10",
            'November' : "11",
            'December' : "12",
        }
        let stats = {
            'Temperature' : "???",
            'Precipitation' : "PRECTOTCORR",
            'Cloudiness' : 'CLOUD_AMT_DAY'
        }
        return [months[month], stats[stat]];
    };

    let [search_month, search_stat] = get_search_strings(entered_month, entered_stat);
    console.log(search_month, search_stat);

    let avg_stat = 0;
    let vaild_entries = 0;
    let search_data = dater[search_stat];

    Object.entries(search_data).forEach((month) => {
        if(search_month == month[0].slice(4, 6)){
            if(month[1] != (-999)) {
                console.log(month[1]);
                vaild_entries++;
                avg_stat += month[1]
            }
        }
    });

    avg_stat = (avg_stat / vaild_entries);
    console.log("AVERAGE STAT: " + avg_stat);
    //Do we want to return a value or directly modify the DOM?
    //console.log("Average cloudiness in " + entered_month + " is " + avg_cloudiness + "%");

</script>