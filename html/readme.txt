
Current task
- Merge cells

Major issues:

Minor issues:
- if element is not of type td, ignore commands.

=================================================================================
Two difficult things to overcome
- resize columns based on zoom of browser and parent
- column resizing for merged cells


=================================================================================
ADDING TABLE
- Ability to add a table (rows x columns)
  > distribute columns equally in 90% of parent

ADDING COLUMNS/ROWS
- Ability to add a column above/below
- Ability to add a row above/below
- Ability to delete column
- Ability to delete row

CELL MERGING
- The selected cells will be merged.
  The cell next to current one will be merged with current
  This will not be allowed in the resizing row.

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



