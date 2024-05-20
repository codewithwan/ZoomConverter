document.getElementById('convertBtn').addEventListener('click', function () {
    const originalLink = document.getElementById('originalLink').value;
    const convertedLink = convertZoomLink(originalLink);
    if (convertedLink) {
        const outputLink = document.getElementById('convertedLink');
        outputLink.href = convertedLink;
        outputLink.innerText = convertedLink;
        outputLink.style.display = 'block';
        document.getElementById('copyBtn').style.display = 'inline-block';
        showNotification('Link converted successfully!', false);
    } else {
        showNotification('Format link tidak valid!', true);
    }
});

document.getElementById('copyBtn').addEventListener('click', function () {
    const convertedLink = document.getElementById('convertedLink').href;
    navigator.clipboard.writeText(convertedLink).then(function () {
        showNotification('Link copied to clipboard!', false);
    }, function (err) {
        showNotification('Could not copy link: ' + err, true);
    });
});

document.getElementById('clearBtn').addEventListener('click', function () {
    document.getElementById('originalLink').value = '';
});

function convertZoomLink(originalLink) {
    const regex = /https:\/\/us05web\.zoom\.us\/j\/(\d+)\?pwd=(\w+)/;
    const match = originalLink.match(regex);
    if (match) {
        const idroom = match[1];
        const isipasswordid = match[2];
        return `https://app.zoom.us/wc/${idroom}/join?fromPWA=1&pwd=${isipasswordid}`;
    }
    return null;
}

function showNotification(message, isError) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.className = isError ? 'notification error' : 'notification';
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}