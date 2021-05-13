
- split cell
- cursor key movement is not natural
- should be able to justify left/right/center a column

Issues related to merge:
Bug 1: If cells have been merged, next addRow doesn't span full table
Bug 2: If cells have been merged, next column doesn't appear vertically, zigzag
Bug 3: merge more than once. I assume set colspan = 2, need to do colspan+=1

Allow merge only in 2nd row (i=1 row)
Will allow to add 

=================================================================================
Two difficult things to overcome
- resize columns based on zoom of browser and parent
- column resizing for merged cells (finally fixed by a top row with max columns)
- Merge related issues. Problems with insert/delete row/col

Known issues:
- insert column has problems if we have merged cells. Probably won't fix.

javascript based resizer: http://jsfiddle.net/3jMQD/
=================================================================================
ADDING TABLE
- Ability to add a table (rows x columns)
  > distribute columns equally in 90% of parent

ADDING COLUMNS/ROWS
- Ability to add a column above/below
- Ability to add a row above/below

DELETING ROWS/COLUMNS
- Ability to delete column
- Ability to delete row

CELL MERGING
- The selected cells will be merged.
  The cell next to current one will be merged with current
  This will not be allowed in the resizing row.

CELL SPLIT
- If cell is split

SAVE LOAD FUNCTIONALITY
- Should be independent of resolution/zooming
- Should support save on one computer resolution and load on another
- all resized columns / other layout should stay same

RESIZING COLUMNS SUPPORT
- A intuitive way of resizing columns should be present

RESIZING CONTAINER / ZOOMING
- resizing parent container should not disturb layout
- browser resizing should not disturb layout

FOREGROUND/BACKGROUND COLORS
- Set foreground color of text in cell/selected cells
- Set background color cell/selected cells

=================================================================

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
