# jsJournal v1.0

jsJournal is a easily customizable procedural blogging system made in pure js that shares some similarities to an SSG as it will generate seamless blog posts directly from the markdown files using a minimally modifyed syntax.

## How to Use:

### Folder structure:
By default the indexer will search from the root directory, so create a folder named `posts` in the root directory of your project.

##### (this can be changed by changing the `folderPath` variable to any directory you want.) 

next make a folder `jsjournal` and put this repo's contents inside, it should look something like this 
```
/
├─ posts/
│  ├─ hello-world
│     ├─ hello-world.md
├─ jsjournal/
   ├─ js/
   ├─ templates/
   ├─ readme.md
```

### Writing Posts:
Every post is a simple markdown file and you can use all standard markdown syntax as well as html elements. The only diffrence is a header at the top of every file using `@@@` to open and close the block, there you can define the title, date, preview text, and tags. after you're done writing, simply add the title of the post to the `files` variable in `preview.js`.

```
@@@
title: Hello World
date: 01/16/25
preview: This is an example preview
tags: test, demo, blog
@@@
```
##### (note: tags are not yet implimented but good to include for the future.)

### Displaying Post Links:
There are two post display options, `_single-post` and `_all-posts` the titles display the corresponding number of entries. all you need is a div with the matching id attribute, eg: `<div id='_single-post'></div>` you can then style everything as needed.
This will get the link to each post so you can finally visit the page.

## Thats it!
you can customize the `postdefault.html` and `blog.css` to your liking and you have a working install!