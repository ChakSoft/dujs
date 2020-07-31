# DuJS

## Installation

```
npm i -g dujs
```

## Usage

```
dujs .

╔═══════════════════════════════════════════════╤════════════╗
║ /home/chaksoft/tools/dujs                     │ 54.30 MiB. ║
╟───────────────────────────────────────────────┼────────────╢
║ /home/chaksoft/tools/dujs/node_modules        │ 54.09 MiB. ║
╟───────────────────────────────────────────────┼────────────╢
║ /home/chaksoft/tools/dujs/.git                │   104 KiB. ║
╟───────────────────────────────────────────────┼────────────╢
║ /home/chaksoft/tools/dujs/bin                 │     8 KiB. ║
╟───────────────────────────────────────────────┼────────────╢
║ /home/chaksoft/tools/dujs/lib                 │     8 KiB. ║
╚═══════════════════════════════════════════════╧════════════╝
```

## Options

You can specify some options :

### `-d [depth=1]` : Search depth

You can specify the depth of the search for the du command.

```
dujs -d 2 .
```

will set the depth to 2.

> Be aware that a big depth could make the command take a **very long time**.

### `-n` : Non human size display

To avoid having a non-human size display (only displaying the number of kilobytes used), set the `-n` flag.

### `-r` : Reverse sorting

To sort the directories by reversed order (lightest folders first), set the `-r` flag.

```
dujs -r .

╔═══════════════════════════════════════════════╤════════════╗
║ /home/chaksoft/tools/dujs/bin                 │     8 KiB. ║
╟───────────────────────────────────────────────┼────────────╢
║ /home/chaksoft/tools/dujs/lib                 │     8 KiB. ║
╟───────────────────────────────────────────────┼────────────╢
║ /home/chaksoft/tools/dujs/.git                │   104 KiB. ║
╟───────────────────────────────────────────────┼────────────╢
║ /home/chaksoft/tools/dujs/node_modules        │ 54.09 MiB. ║
╟───────────────────────────────────────────────┼────────────╢
║ /home/chaksoft/tools/dujs                     │ 54.34 MiB. ║
╚═══════════════════════════════════════════════╧════════════╝
```

### `-f` : Include all files

Wrapping around the `-a` flag of the `du` command. Displays all the files that are scanned, respecting the depth property.

## License

This software is licensed with the GPL-v3.0 license. See LICENSE file for further information.
