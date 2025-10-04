import csv

search_lat = 57.7089
search_lon = 11.9746

with open('python_corner/latitude.csv') as file:
    latitude_map = csv.reader(file, delimiter=' ', quotechar='|')
    latitude_map = list(latitude_map)

with open('python_corner/longitude.csv') as file2:
    longitude_map = csv.reader(file2, delimiter=' ', quotechar='|')
    longitude_map = list(longitude_map)

print(latitude_map[200])

for i in range(0, len(latitude_map)):
    latitude_map[i] = latitude_map[i][0].split(',')
    latitude_map.pop()
    print(i)
    
print(latitude_map[5][30])

    
#closest_lat_row = []
#closest_hit_lat = (0,0)
#smallest_diff_lat = 99999
#for i in range(0, len(latitude_map)):
#    curr_row = latitude_map[i][0].split(',')
#    curr_row.pop()
#    for j in range(0, len(curr_row)):
#        curr_diff = abs(float(curr_row[j]) - search_lat)
#        if curr_diff < smallest_diff_lat:
#            smallest_diff_lat = curr_diff
#            closest_hit_lat = (i, j)
#            closest_lat_row = curr_row
#
#closest_lon_row = []
#closest_hit_lon = (0,0)
#smallest_diff_lon = 99999
#for i in range(0, len(longitude_map)):
#    curr_row = longitude_map[i][0].split(',')
#    curr_row.pop()
#    for j in range(0, len(curr_row)):
#        curr_diff = abs(float(curr_row[j]) - search_lon)
#        if curr_diff < smallest_diff_lon:
#            smallest_diff_lon = curr_diff
#            closest_hit_lon = (i, j)
#            closest_lon_row = curr_row
#
#
#
#
#print(f" LAT closest_hit: {closest_hit_lat}")
#print('diff' + str(smallest_diff_lat) + '\n')
#
#print(f" LONG closest_hit: {closest_hit_lon}")
#print(f"diff: {smallest_diff_lon}")
#
#
#print(f"CLOSEST LAT_CHECK: {closest_lat_row[28]}")
#print(f"CLOSEST LONG_CHECK:")