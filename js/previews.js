// ###########################################################
// # jsJournal/preview.js v2                                  #
// # created by CtrlAus                                      #
// # Distributed under the GPL3 Licence                      #
// ###########################################################

// * Config *

// titles of all the blog posts in the directory with no file extension
const files = [
    'hello-world',
    'hello-world-2'
];

const folderPath = '/posts/';           // The folder path of all blogposts
const allPostsTag = '_all-posts';       // The ID of the div containing all posts
const singlePostTag = '_single-post';   // The ID of the div containing a single post

const autoFetch = false;                // This is not implemented/not sure its possible
const autoSort = false;                 // This is not implemented 



// ``**########## ! main code - avoid messing with this ! ############**``

const allPostContainer = document.getElementById(allPostsTag);
const singlePostContainer = document.getElementById(singlePostTag);

if (typeof(allPostContainer) != 'undefined' && allPostContainer != null) {
    allPostContainer.innerHTML = '';
    populateAllPosts();
}

if (typeof(singlePostContainer) != 'undefined' && singlePostContainer != null) {
    populateSinglePost();
}

async function populateSinglePost() {
    let file = files[0]
    await populateContainer(`${folderPath}/${file}/${file}.md`, file, singlePostContainer);   
}

async function populateAllPosts() {
    for (const file of files) {
        await populateContainer(`${folderPath}/${file}/${file}.md`, file, allPostContainer);
    }
}

async function populateContainer(filePath, fileName, container) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('response was not ok');
        
        const text = await response.text();

        var postcontent = getBetweenMarkers(text, "@@@");
        var title = parsePostHeader(postcontent).title;
        var date = parsePostHeader(postcontent).date;
        var preview = parsePostHeader(postcontent).preview;
        container.innerHTML += '<a href="/jsjournal/templates/postdefault.html/#' + fileName + '" class="_post"><div><h1>' + title + '</h1>\n<time>' + date + '</time>\n</div><p>' + preview + '</p></a>';
    
    } catch (error) {
        console.error('Error fetching file:', error);
    }
}

function getBetweenMarkers(text, marker) {
    const regex = new RegExp(`${marker}(.*?)${marker}`, 'gs'); // Create a dynamic regex based on the marker
    let match;

    while ((match = regex.exec(text)) !== null) {
        return(match[1].trim()); // Print the matched text
    }
}

function parsePostHeader(data) {
    const postData = {};
    const lines = data.split('\n');

    lines.forEach(line => {
        const [key, value] = line.split(': ').map(item => item.trim());
        postData[key] = value;
    });

    return postData;
}
