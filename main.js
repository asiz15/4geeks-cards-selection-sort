window.onload = function () {

    var old_element = document.getElementById("rollBtn");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    const suits = [
        {
            name: 'Hearts',
            color: '#d63031',
            symbol: '♥'
        },
        {
            name: 'Spades',
            color: '#1e272e',
            symbol: '♠'
        },
        {
            name: 'Clubs',
            color: '#1e272e',
            symbol: '♣'
        },
        {
            name: 'Diamonds',
            color: '#d63031',
            symbol: '♦'
        }
    ]

    const generateDeck = () => {
        const deck = []
        suits.forEach(suit => {
            for (let c = 2; c <= 14; c++) {
                deck.push({ ...suit, value: c, renderValue: cardRenderValue(c) })
            }
        });

        return deck
    }

    const cardRenderValue = (val) => {
        if (val === 11) {
            return 'J'
        }
        if (val === 12) {
            return 'Q'
        }
        if (val === 13) {
            return 'K'
        }
        if (val === 14) {
            return 'A'
        }

        return `${val}`
    }

    const generateRandomIndex = (max) => {
        min = 0
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min)
    }

    const generateRandomCards = () => {
        let times = document.getElementById('inputRandom').value || 0
        if (times > 52) {
            times = 52
        }
        const arr = []
        for (let cards = 1; cards <= times; cards++) {
            const randomIndex = generateRandomIndex(deck.length - 1)
            arr.push(deck[randomIndex])
            deck.splice(randomIndex, 1)
        }

        return arr

    }

    const renderCards = (arr) => {
        const container = document.getElementById('deckRender')
        arr.forEach(card => {
            const cardDiv = `<div class="card">
            <div class="symbol top-left" style="color: ${card.color}">${card.symbol}</div>
            <div class="symbol bottom-right" style="color: ${card.color}">${card.symbol}</div>
            <div class="card-render-value" style="color: ${card.color}">${card.renderValue}</div>
        </div>`
            container.insertAdjacentHTML("beforeend", cardDiv);
        });
    }

    const renderLogs = (rows) => {
        const logs = document.getElementById('logsList')
        const render = []

        console.log(rows, '<--')

        const card = (card, index) => {
            return `<div class="card">
            <div class="symbol top-left" style="color: ${card.color}">${card.symbol}</div>
            <div class="symbol bottom-right" style="color: ${card.color}">${card.symbol}</div>
            <div class="card-render-value" style="color: ${card.color}">${card.renderValue}</div>
        </div>`

        }
        rows.forEach((row, index) => {
            let logRow = document.createElement('div');
            const h6 = document.createElement('h4')
            h6.innerHTML = `${index}.`
            h6.style.padding = '1em'
            logRow.appendChild(h6)
            logRow.classList.add('logRow')

            row.forEach(c => {
                const appendCard = card(c)
                logRow.insertAdjacentHTML("beforeend", appendCard);
            })
            logs.appendChild(logRow)

        })
    }
    const sortCards = () => {
        console.log((cards))


    };
    const sortItems = (arr) => {
        let min = 0;
        const logs = []
        while (min <= arr.length - 1) {
            const asd = [...arr]
            logs.push(asd)
            for (let i = min + 1; i < arr.length; i++) {
                if (arr[min].value && arr[min].value > arr[i].value) {
                    let aux = arr[min];
                    arr[min] = arr[i];
                    arr[i] = aux;
                }
            }
            min++;
        }
        return logs;
    }

    const clearCards = () => {
        const container = document.getElementById('deckRender')
        while (container.firstChild) {
            container.firstChild.remove()
        }
    }

    const clearSorted = () => {
        const container = document.getElementById('logsList')
        while (container.firstChild) {
            container.firstChild.remove()
        }
    }

    document.getElementById('rollBtn').addEventListener('click', function () {
        clearCards()
        clearSorted()
        deck = generateDeck()
        cards = generateRandomCards()
        renderCards(cards)

    })

    document.getElementById('sortBtn').addEventListener('click', function () {
        const logRows = sortItems([...cards])
        console.log(logRows)
        renderLogs(logRows)

    })


    let deck = generateDeck()
    let cards = generateRandomCards()
    let sortedCards

    renderCards(cards)

}