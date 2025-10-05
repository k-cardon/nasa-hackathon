import csv
import math

search_lat = 48.1372
search_lon = 11.5756
R = 6371



with open('python_corner/latitude.csv') as file:
    latitude_map = csv.reader(file, delimiter=' ', quotechar='|')
    latitude_map = list(latitude_map)

with open('python_corner/longitude.csv') as file2:
    longitude_map = csv.reader(file2, delimiter=' ', quotechar='|')
    longitude_map = list(longitude_map)


for i in range(0, len(latitude_map)):
    latitude_map[i] = latitude_map[i][0].split(',')
    latitude_map[i].pop()
    
for i in range(0, len(longitude_map)):
    longitude_map[i] = longitude_map[i][0].split(',')
    longitude_map[i].pop()

def check_distance(search_lat, search_lon, compare_lat, compare_lon):

    search_lat_rad = math.radians(search_lat)
    search_lon_rad = math.radians(search_lon)

    compare_lat = math.radians(compare_lat)
    compare_lon = math.radians(compare_lon)

    dlat = compare_lat - search_lat_rad
    dlon = compare_lon - search_lon_rad

    a = (math.sin(dlat / 2)**2 +
         math.cos(search_lat_rad) * math.cos(compare_lat) *
         math.sin(dlon / 2)**2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = R * c
    return distance

smallest_distance = 100000
smallest_distance_coords = (0,0)
for i in range(0, len(latitude_map)):
    for j in range(0, len(latitude_map[i])):
        curr_dist = check_distance(search_lat, search_lon, float(latitude_map[i][j]), float(longitude_map[i][j]))
        if curr_dist < smallest_distance:
            smallest_distance = curr_dist
            smallest_distance_coords = (i, j)


print(f"Smallest distance: {smallest_distance} to coords located at {smallest_distance_coords}")
#print(check_distance(search_lat, search_lon, compare_lat, compare_lon))

#print(f"radified search coords: LAT: {search_lat_rad} LON: {search_lon_rad}")
#print(f"radified compare coords: LAT: {compare_lat}) LON: {compare_lon}")


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