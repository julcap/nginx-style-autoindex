(function () {
    var nginx = {
        getFirstElement: function (str) {
            let element = document.createElement("DIV");
            element.innerHTML = str;
            if (!element.firstChild) return ''
            element.firstChild.title = element.firstChild.innerText;
            return element.firstChild.outerHTML;
        },
        getDate: function (str) {
            // Match date format '07-Oct-2021 20:11'
            let matched = str.match(/[0-9]{2}-[A-Z][a-z]{2}-[0-9]{4} [0-9]{2}:[0-9]{2}/)
            return matched ? matched[0] : '';
        },
        getSize: function (str) {
            let strSplitted = str.split(' ');
            let size = strSplitted[strSplitted.length - 1].match(/[0-9].+/);
            return size ? this.parseSize(size[0]) : '';
        },
        parseSize: function (strSize) {
            if (!strSize) return null;
            let calculate = (size, index = 0) => {
                if (size < 900) return [size, index]
                return calculate(parseFloat(size / 1024).toFixed(2), ++index);
            }
            let metrics = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
            let [size, index] = calculate(parseInt(strSize));
            return [size, metrics[index]].join(' ');
        },
        removeExtraSpaces: function (str) {
            return str.replace(/\s+/g, ' ');
        },
        init: function () {
            if (!document.querySelector) return;
            var nginxList = document.querySelector('body>pre');
            if (!nginxList) return;

            //transform link elements to li and add classNames
            var htmlLines = nginxList.innerHTML.split('\n');
            let html = [];
            htmlLines.forEach(line => {
                line = this.removeExtraSpaces(line);
                let anchorElement = this.getFirstElement(line);
                let date = this.getDate(line);
                let size = this.getSize(line);
                if (anchorElement) {
                    html.push(`<li>${anchorElement}<div class="date">${date}</div><div class="size">${size}</div></li>`);
                }

            })
            html[0] = `<li class="back"><a href="../"><svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.676 26.676" xml:space="preserve">
                        <path d="M26.105 21.891a.568.568 0 0 1-.529-.346c-.066-.156-1.716-3.857-7.885-4.59-1.285-.156-2.824-.236-4.693-.25v4.613a.574.574 0 0 1-.304.508.577.577 0 0 1-.588-.033L.254 13.815a.573.573 0 0 1 0-.953l11.857-7.979a.563.563 0 0 1 .588-.029c.19.102.303.295.303.502v4.293c2.578.336 13.674 2.33 13.674 11.674a.574.574 0 0 1-.459.562c-.037.006-.076.006-.112.006z"/>
                        </svg></a></li>`
            html.unshift('<ul class="nginx-list">');
            html.push('</ul>');
            nginxList.innerHTML = html.join('');
        }
    };
    nginx.init();
}());