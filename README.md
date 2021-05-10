# togglerator README

## Features

Toggles between first occurrence of user configured tags on current line. Tags can be situated anywhere on the line, including in comments.

### Examples

* TODO, WAIT, DONE
* -, +
* [ ], [x]
* var, const
* int, float
* Now, Later
* (whatever else you can think of)

Default keybinding: alt+t
Command: 'Togglerator: Toggle'

## Requirements

none

## Extension Settings

"togglerator.tags": semi-colon-separated tags (default: "TODO;DONE")

## Changelog

### 0.0.2

Tags are now user configurable in settings menu ("togglerator.tags"). Default is TODO, DONE.

### 0.0.1

Initial release. Hard coded TODO, DONE and WAIT commands.