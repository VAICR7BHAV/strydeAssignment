# strydeAssignment

This code creates a REST API which takes an array as input and removes all duplicates from it.

To run this code, install all the necessary packages, and run the following command:

### node app.js

Visit the address localhost:8000 in any browser and proivde the input as mentioned below.

## Sample Input 
{ "inputArray" : ["lovish" , "sukrati","sukrati", "lovish", "yash", "yash"] }

(Please ensure that the JSON object passed as input is correct.(Everything should be in double quotes))


## Sample Output

The API returns a JSON object of the following type. 
The outputArray is the array with no duplicates.

{"outputArray":["lovish","sukrati","yash"]}
