var textInput = document.createElement("input");
document.body.appendChild(textInput);
var lastClipValue = null;

function getTextFromClipboard()
{
    textInput.value = '';
    textInput.select();
    document.execCommand('paste');
    return textInput.value.trim();
}

lastClipValue = getTextFromClipboard();

function timerTick()
{
    setTimeout(function () {
        var clip = getTextFromClipboard();
        if (clip != lastClipValue &&
            (clip.indexOf('http://') === 0 || clip.indexOf('https://') === 0) &&
            clip.indexOf(' ') === -1)
        {
            lastClipValue = clip;
            chrome.tabs.getSelected(null, function (tab) {
                if (tab == null || clip != tab.url)
                {
                    chrome.tabs.create({url: lastClipValue});
                    console.log('Opened url ' + lastClipValue);
                }
                else {
                    console.log('Not opening current tab url');
                }

            });
        }
        timerTick();
    }, 1000);
}

timerTick();

