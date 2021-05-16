 
- Going to work on CELL, TABLE, CONTAINER level functionalities
  > Start with justification/alignment
  	LEFT, RIGHT, CENTER, INHERIT PARENT
  > Also font-size, color

- handle <br> and <div> in table cells and in text
- Proper width scaling in PDF
- Load JSON file and make proper text/table sections

- font size support per cell
- font size support per table
- font size support per container
- left, justify, center, justify support
- multiple cell selection for coloring, fontsize
- Delete table


LOW PRIORITY
- cursor key movement is not natural, made some conceptual example in arrow_tab_control
  > will handle later -- low priority
- should be able to justify left/right/center a column

=================================================================================
BIG CHALLENGES
- resize columns based on zoom of browser and parent
- column resizing for merged cells (finally fixed by a top row with max columns)
  > was too hard to get fixed
- Merge related issues. Problems with insert/delete row/col
- Not much expertise in javascript

LESSONS TO BE LEARNT
- SUPER programmers should have the capability to think while development also
  > Programming should be dont automatically, just like you drive a bicycle or speak.
- It is ok for junior programmers to follow orders / specs as is.
- Senior programmers should challenge specs and get specs modified if issues in specs
  > Programmer is in the trench, he needs to understand the usage why it is done
    and should suggest improvements
- If you can't get a task completed in 15 min, there is some issue --- think ???

javascript based resizer: http://jsfiddle.net/3jMQD/
=================================================================================
git log | grep "   " > out.txt
tac out.txt 

SPECIFICATIONS:
=================================================================================
ADDING TABLE
- Ability to add a table (rows x columns)
  > distribute columns equally in 100% of parent
  > zooming should not disturb it
  > reloading should not distrub it

DELETING TABLE
- Delete current table

ADD TEXT/PARA SECTION
- Add text/para section
- Add text section before table
- Add text section after table

RESIZING COLUMNS SUPPORT
- A intuitive way of resizing columns should be present

RESIZING CONTAINER / ZOOMING
- resizing parent container should not disturb layout
- browser resizing should not disturb layout

ADDING COLUMNS/ROWS
- Ability to add a column above/below
- Ability to add a row above/below

DELETING ROWS/COLUMNS
- Ability to delete column
- Ability to delete row

CELL MERGING
- The cell next to current one will be merged with current
- If next cell has longer span, take that into consideration  

CELL SPLIT
- If cell is merged, we should be able to split it
- Should not split if already column span is 1

SAVE LOAD FUNCTIONALITY
- Should be independent of resolution/zooming
- Should support save on one computer resolution and load on another
- all resized columns / other layout should stay same

TABLE LEVEL FORMATTING
- alignment of all cells
- horizontal alignment of table
- fontsize of entire table

CELL FORMATTING
- Set foreground color of text in cell/selected cells
- Set background color cell/selected cells
- decrease/increase font size in a cell
- Italic Bold, etc. 

MULTIPLE SELECTION OF CELLS
- for fontsize change
- Justification
- coloring

ENTIRE CONTAINER FORMAT
- Base font size increase/decrease support
- Set basefontsize

USER EXPERIENCE
- Natural cursor movement via arrow keys and tabs - A Bit harder in contenteditable
- Right click submenu for different commands

CONVERT DATA FROM ALL ABOVE FEATURES TO PROPER PDF
- Rewrite html-table parsing code to support all of above
  Support all above features - most of above carry to backend

ADD DOCUMENTATION FOR FRONT AND BACKEND

LEARN JAVASCRIPT/CSS ALONG TO MANAGE REQUIREMENTS ABOVE

=================================================================
May 13th
3:50PM Going to fix load save issue for changed resolution
       Going to save the container width during save process
       And going to scale the table columns on load process

4:15PM Going to start on Merge issue, 
       first going to think about strategy/specs more closely.

	   - Will allow for merge in top row only
	   - will merge the next cell with current cell
	   - May allow selected cells to be merged - Later
	   - The distribution of cells below merged cells would divide equally
	   - First start off by deleting the next cell
	   - merging cells worked, but resizing is broken.
	   - previously was using CSS resizing, now have to look into javascript resizing
	     so that I have better control. But, I do suspect that might run into same
	     problem. If I run into same problem, then will have to implement table myself probably

7:40PM
	Implemented a new strategy for resizing with merging
	Added a top thin row for resizing, now javascript not needed again.
	This one was hard to overcome, took like 1 hour to find solution.
	This is an example, where I was stuck due to "table" not properly supporing width stuff
	for tables with colspan.


8:30PM: After dinner, started testing. Found an issue with insert column if cells merged. 
        Not fixing it for the time bing.

        Continued testing - can't leave it for QA to find issues, I am the developer
                            and I am responsible for reliability of codes.

        Merging is a relatively complex thing to handle after merging
        	previous functionality has issues.

11:15PM:
	Have done signficiant implementation: 
		Delete row/col, 
		A context menu,
		color filling

May 14th.
12:15AM.  Need to fix the bugs so that can shift to PDF.

3:20AM. Fixed the bug of merge cells.

4:07AM. Decrease, increase fontsize implemented.
	
May 16th.
8:05 Resume work.