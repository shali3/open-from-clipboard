var textInput = document.createElement("input");
document.body.appendChild(textInput);
var lastOpenedurl = null;

function getTextFromClipboard()
{
    textInput.value = '';
    textInput.select();
    document.execCommand('paste');
    return textInput.value.trim();
}

lastOpenedurl = getTextFromClipboard();

function timerTick()
{
    setTimeout(function () {
        var clip = getTextFromClipboard();
        if (clip != lastOpenedurl &&
            (clip.indexOf('http://') === 0 || clip.indexOf('https://') === 0) &&
            clip.indexOf(' ') === -1)
        {
            chrome.tabs.getSelected(null, function (tab) {
                lastOpenedurl = clip;
                if (tab == null || clip != tab.url)
                {
                    chrome.tabs.create({url: lastOpenedurl});
                    console.log('Opened url ' + lastOpenedurl);
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

