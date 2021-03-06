
### Description

This package helps you manage your tasks by ranking them.

### Usage

`./init.js` will initialize your task database

`./add.js {task}` will add a task to the database

`./remove {#id}` will remove a task from the database

`./pull.js` will sample tasks from the database and expect a ranking in return, comma delimited.

`./manyadd.sh` will accept a stream of tasks to add to the database new line delimited

### Feature requests

Make some.  I will put them here and people can rank them.

### Operation

This set of programs manages a task database that is condorcet ranked.

Each time a task selection process is initiated N tasks are given as options.

The user ranks the options and the top ranked one is the task they select.

The ranking acts as one cast in a condorcet election.

The next time a task selection process is initiated tasks are sampled with a statistical bias towards the ones that are higher ranked.

The algorithm used is condorcet-irv.  This means that a condorcet winner or winners is chosen for the first position, then the second position is the same process with those in the first omitted.

A condorcet winner is a winner that wins head to head against all candidates, or looses to the least possible number of candidates.

The database for this will simply be a large javascript object with two children.  One will store the properties of the task like its name, and the other a vote count against other tasks.


Object
 meta
  [id]:"name"
 votes
  [id]:{[id]:int}

int is the vote difference between them in head to head.

So we have a rank cast of A,B,C,D to a fresh vote database.  The resulting votes object would be

{a:{b:1,c:1,d:1},b:{a:-1,c:1,d:1},c:{a:-1,b:-1,d:1},d:{a:-1,b:-1,d:-1}}

To process the winner simply identify whose children are all possitive.  Gave a set called previouswinners and omit them for consideration when yyou do a pass to find a second and third winner.


The list of events that can happen on the database are:
 A task is added
 A vote is cast
 A task is removed

When a task is added it has no votes and so wins against all it has been compared to so is automatically a condorcet winner.
When a task is removed all references of it are deleted.

Each time a program is run it reads the object stored in json via require, make the modifications to the object, and then writes the object again to the json file.


