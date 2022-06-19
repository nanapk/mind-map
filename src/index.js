//mport './favicon.ico';
// favicon build
//import '../model/data.json';
// data build
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';

cytoscape.use(coseBilkent);

import './style.css';
// webpack으로 묶어줘야 하니 css파일을 진입점인 index.js 에 import 합니다

const data = [
    {
        "data": {
            "id": "A",
            "url": "https://github.com/nomelancholy/js-project-driven-study-mind-map/projects/1?add_cards_query=is%3Aopen",
            "label": "A"
        }
    },
    {
        "data": {
            "id": "B",
            "url": "https://www.google.co.kr/search?newwindow=1&safe=off&sxsrf=ACYBGNQPahfceN-IrrIMqFcBxt0bBJxcog%3A1577373548670&source=hp&ei=bM8EXp3aJoKpoASW2InwAg&q=no+such+file+or+directory%2C+open+%27C%3A%5Cdev%5Cworkspace%5Cjs-seomal-clone%5Cpackage.json%27&oq=no+such+file+or+directory%2C+open+%27C%3A%5Cdev%5Cworkspace%5Cjs-seomal-clone%5Cpackage.json%27&gs_l=psy-ab.3...7437.7437..8911...1.0..0.95.95.1......0....2j1..gws-wiz.pzIrSS2UT84&ved=0ahUKEwidwK2wztPmAhWCFIgKHRZsAi4Q4dUDCAY&uact=5",
            "label": "B"
        }
    },
    {
        "data": { "id": "A->B", "source": "B", "target": "A" }
    },
    {
        "data": {
            "id": "C",
            "url": "https://stackoverflow.com/questions/9484829/npm-cant-find-package-json",
            "label": "C"
        }
    },
    {
        "data": { "id": "A->C", "source": "C", "target": "A" }
    }
];

let curASCII = 68; // D
function GetNewID() {
    if (curASCII == 91) curASCII = 97;
    return String.fromCharCode(curASCII++);
}

// node & font 크기 값
const edgeWidth = '2px';
const arrowScale = 0.8;
// edge & arrow 크기값
const edgeColor = '#ced6e0';
const nodeColor = '#57606f';

// 아래는 공식 사이트에 올라와 있는 예제 코드입니다
const cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: data,

    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': nodeColor,
                'label': 'data(label)',
                'color': nodeColor
            }
        },

        {
            selector: 'edge',
            style: {
                'width': edgeWidth,
                'curve-style': 'bezier',
                'line-color': edgeColor,
                'source-arrow-color': edgeColor,
                'source-arrow-shape': 'vee',
                'arrow-scale': arrowScale
            }
        }
    ],

    layout: {
        name: 'cose-bilkent',
        animate: false,
        gravityRangeCompound: 1.5,
        fit: true,
        tile: true
    }
});

let bTapHold = false;

cy.on('tap', function (e) {
    if (bTapHold) {
        bTapHold = false;
        return;
    }
    if (curASCII == 123) {
        alert("더 이상 추가할 수 없습니다.");
        return;
    }

    console.log(e.target);

    const parentId = e.target.data('id');
    const parentPos = e.target.position();

    const newId = GetNewID();
    
    cy.add([
        {
            group: 'nodes',
            data: {
                id: newId,
                url: "asdfasdf",
                label: newId
            },
            position: { x: parentPos.x, y: parentPos.y + 80 }
        },
        {
            group: 'edges',
            data: {
                id: `${parentId}->${newId}`,
                source: newId,
                target: parentId
            }
        }
    ]);
});

cy.on('taphold', function (e) {
    const myId = e.target.data('id');
    let count = 0;
    e.target.connectedEdges().forEach(function (target) {
        if (target.target().data('id') == myId) {
            count++;
        }
    });
    
    if (count != 0) {
        alert("끝부분만 삭제가 가능합니다.");
        return;
    }

    cy.remove(e.target);
    bTapHold = true;
});

let resizeTimer;

window.addEventListener('resize', function () {
    this.clearTimeout(resizeTimer);
    resizeTimer = this.setTimeout(function () {
        cy.fit();
    }, 200);
});