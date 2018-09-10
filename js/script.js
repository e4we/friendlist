Model.login(6688746)
    .then(() => window.Controller['friendsList']('.left-list'))
    .catch(e => {
        console.error(e);
        alert('Ошибка: ' + e.message);
    });

let counter = 0;
let curDrag;

function getCurrentZone(from) {
    do {
        if (from.classList.contains('mainlist-zone')) {
            return from;
        }
    } while (from = from.parentElement);

    return null;
}

document.addEventListener('dragstart', (e) => {
    const zone = getCurrentZone(e.target);

    if (zone) {
        curDrag = { startZone: zone, node: e.target };
    }
});

document.addEventListener('dragover', (e) => {
    const zone = getCurrentZone(e.target);

    if (zone) {
        e.preventDefault();
    }
});

document.addEventListener('drop', (e) => {
    if (curDrag) {
        const zone = getCurrentZone(e.target);

        e.preventDefault();

        if (zone && curDrag.startZone !== zone) {
            if (e.target.classList.contains('friend')) {
                zone.insertBefore(curDrag.node, e.target.nextElementSibling);
            } else {
                zone.insertBefore(curDrag.node, zone.lastElementChild);
            }
        }
        curDrag = null;
    }
});

const leftList = document.querySelector('.left-zone');
const rightList = document.querySelector('.right-zone');

leftList.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'friend-btn-add') {
        rightList.insertBefore(e.target.parentNode, rightList.firstChild);
    }
});

rightList.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'friend-btn-add') {
        leftList.insertBefore(e.target.parentNode, leftList.firstChild);
    }
});

const isExist = (full = '', chunk = '') => full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1 ? true : false;

const showSearchResult = (nodeList, element) => {
    for (let prop in nodeList) {
        let vision = isExist(nodeList[prop].textContent, element.value) ? 'flex' : 'none';

        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[prop].nodeType === 1) {
                nodeList[prop].parentNode.style.display = vision;
            }
        }
    }
}

const left_input = document.querySelector('.input-left');
const right_input = document.querySelector('.input-right');

left_input.addEventListener('input', () => {
    const nodeList = document.querySelectorAll('.left-zone ul li span');

    showSearchResult(nodeList, left_input);
});

right_input.addEventListener('input', () => {
    const nodeList = document.querySelectorAll('.right-zone li span');
    
    showSearchResult(nodeList, right_input);
});