(function () {
    var nginx = {
        getFirstElement: function (str) {
            let element = document.createElement("DIV");
            element.innerHTML = str;
            return element.firstChild ? element.firstChild.outerHTML : null;
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
                if (size.length < 5) return [size, index]
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
            if (html.length) {
                html.unshift('<ul class="nginx-list">');
                html.push('</ul>');
                nginxList.innerHTML = html.join('');
            }
        }
    };
    nginx.init();
}());