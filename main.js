window.onload = function () {

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
        const times = document.getElementById('inputRandom').value || 0
        const arr = []
        for(let cards = 1; cards <= times; cards++){
            const randomIndex = generateRandomIndex(deck.length - 1)
            arr.push(deck[randomIndex])
            deck.splice(randomIndex, 1)
        }

        return arr
    
    }
    
    const renderCards = (arr) =>{
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

    const sortCards = (arr) => {
        let wall = arr.length - 1; 
        while (wall > 0){
            let index = 0;
            while (index < wall) {
              if (arr[index].value > arr[index + 1].value) { 
                let aux = arr[index]; 
                arr[index] = arr[index + 1];
                arr[index + 1] = aux;
              }
              index++;
            }
            wall--;
        }
        cards = arr        
    };

    const clearCards = () => {
        const container = document.getElementById('deckRender')
        while (container.firstChild) {
            container.firstChild.remove()
        }
    }
    
    document.getElementById('rollBtn').addEventListener('click', function(){
        clearCards()
        deck = generateDeck()
        cards = generateRandomCards()
        renderCards(cards)

    })

    document.getElementById('sortBtn').addEventListener('click', function(){
        clearCards()
        sortCards(cards)
        renderCards(cards)
    })

   
    let deck = generateDeck()
    let cards = generateRandomCards()

    renderCards(cards)
    
}