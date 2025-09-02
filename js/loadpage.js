var documentLocation = window.location.href
var folderPath = ''

var converter = new showdown.Converter();
const postBody = document.getElementById('postBody');

async function loadContent() {
    postBody.innerHTML = 'Looks like you found a broken page or its just loading ^^';
    extractedLocation = documentLocation.split('#')[1] || '';
    folderPath = '/posts/' + extractedLocation +'/' + extractedLocation + '.md';

    const response = await fetch(folderPath);
    if (!response.ok) throw new Error('Error Reading File');
    
    const text = await response.text();
    // postBody.innerHTML = text

    fetchMarkdownFile(folderPath)
}

async function fetchMarkdownFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const noprocesstext = await response.text();
        const text = deleteBetweenMarkers(noprocesstext, "@@@")

        var postheader = deleteBetweenMarkers(text, "@@@");
        var title = parsePostHeader(postheader).title;
        var date = parsePostHeader(postheader).date;
        var preview = parsePostHeader(postheader).preview;

        var html = converter.makeHtml(text);

        postBody.innerHTML = html;

    } catch (error) {
        console.error('Error fetching file:', error);
    }
}

function deleteBetweenMarkers(text, marker) {
    const regex = new RegExp(`${marker}.*?${marker}`, 'gs');
    return text.replace(regex, '');
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

loadContent()
