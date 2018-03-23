/**
 * @file copy text to clipboard
 * @author coypan
 */

function TinnyCopy(opts) {

    this.selectText = opts.selectText;

    this._event = {};
}

TinnyCopy.prototype = {
    on: function (status, fn) {
        this._event[status] = fn;
    },
    createFakeEle: function () {
        this.fakeEle = document.createElement('textarea');
        this.fakeEle.style.fontSize = '13px';
        this.fakeEle.style.border = '0';
        this.fakeEle.style.padding = '0';
        this.fakeEle.style.margin = '0';
        this.fakeEle.style.position = 'absolute';
        this.fakeEle.style.left = '-999px';

        var yPosition = window.pageYOffset || document.documentElement.scrollTop;
        this.fakeEle.style.top = yPosition + 'px';

        this.fakeEle.setAttribute('readonly', '');
        this.fakeEle.value = this.selectText;

        document.body.appendChild(this.fakeEle);

        this.fakeEle.select();

        this.fakeEle.setSelectionRange
            && this.fakeEle.setSelectionRange(0, this.fakeEle.value.length);
    },
    copy: function () {
        this.createFakeEle();
        var success = false;
        try {
            success = document.execCommand('copy');
        }
        catch (e) {
            console.log(e);
        }
        this.handleResult(success);
        document.body.removeChild(this.fakeEle);
    },
    handleResult: function (res) {
        if (res) {
            this._event['success']
                && this._event['success'].call(null, {
                    selectText: this.selectText
                });
        }
        else {
            this._event['fail']
                && this._event['fail'].call(null, {
                    selectText: this.selectText
                });
        }
    }
}

module.exports = TinnyCopy;
