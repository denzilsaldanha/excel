# Excel in JavaScript

Questions 1-4 and 7 have been solved

## Directions of use

Open the index.html file

In order to refresh the page and save data, use the refresh button.

In order to refresh the whole page and not retain any data use the browser refresh/reload button.

In order to make some text formatted, select the text that you want to format and click on button with the type of formatting you would like i.e. bold, italics

## Steps:
1. Create index.html in your favourite text editor. Use pure JavaScript in your code – no
JavaScript libraries or frameworks. Your JavaScript can either be in a separate .js file, or it
can be contained in the index.html page.
2. When loading index.html into Chrome or Firefox, it should draw a 100x100 grid of cells,
with columns labelled A-Z, AA, AB, AC, etc. and rows numbered 1 to 100.
3. When you click in a cell and enter a number, it should store the number in a JavaScript
object (note: this would be lost when you refresh the page).
4. Have a refresh button that redraws the grid (without refreshing the page) and inserts data
into cells where you've saved it.
5. Add support for some basic formulas. For example if you enter "=A1+A2" into A3 it
should calculate the sum of these two cells and display the result in A3. Updating A1 would
update A3.
6. Add support for some basic functions. For example if you enter "=sum(A1:A10)" into
A11, then it should calculate the sum of all cells in the range and display the result in
A11. Updating any value in the range would recalculate A11.
7. Add support for formatting, for example bold, italics and underline
## Time Breakdown on the project
- Steps 1-4 Took about 2.75 hours to complete
- Step 7 took 30 mins to get it working completely
- Last half an hour used for testing, cleaning up bugs and writing the README.md

## What I learnt
Frontend development is not my forte. I had to learn a little bit about listereners, css to solve some of the problems. That said, I used my strengths in algorithms and general programming logic to solve the given task. It was a fun exercise to actually try something different and solve a new problem. 

## Steps taken to solve the problem
Initially I did some research to find out solutions that were similar to what I was looking for. I looked at stackoverflow, MDN Web Docs to find content that would help me solve my problem. Once I was able to find a solution that solved part of my problem, I modified it to solve the exact problem I needed.


## Design logic for questions not implemeneted

### Question 5
1. Modify the listerner to check if the content in a editable cell has a string starts with '='
2. Use string manipulation to split the string into multiple parts based on special characters ['=','A1','+','A2']
3. The second and fourth part of the error should be a mix of integers and charaters while the other two should be special characters with an additional check that the first position is an equal to and the third is an allowed operation. This should raise an warning/ alert if it doesn't match.
4. There is a function that converts an integer into the row format, this could be reversed to return an integer given some letters. Therefore the Characters would be used to retrieve the row and the integer to return the column
5. Then use this to calculate the operation given in the third position.
6. Output the result in the adjacent cell

## Question 6 
1. Modify the listerner to check if the content in a editable cell has a string starts with an allowed operation i.e. 'sum'/'diff'
2. Use string manipulation to split the string into multiple parts based on special characters ['sum','(','A1',':','A10',')']
3. Validate that the 3rd and 5th positions are column names, the 2nd and 6th are () and the 4th position is a colon. If not raise an alert/ warning.
4. There is a function that converts an integer into the row format, this could be reversed to return an integer given some letters. Therefore the Characters would be used to retrieve the row and the integer to return the column.
5. Iterate over the given range and store each value in an array
6. Using the operation in the first position (sum) perform the operation over the given array
7. Output the result in the adjacent cell

## Inherent code issues
- Formatting of cells
- Uncaught exception when trying to format a cell and not select any text

## Future Extensions
- More CSS format the columns well
- Try to differentiate the row and column values with a different color

