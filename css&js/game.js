var turnNo = 0
var player1cardNum1 = 0;
var player1cardNum2 = 0;
var player1jocbo = ''
var player2cardNum1 = 0;
var player2cardNum2 = 0;
var player2jocbo = ''
var player3cardNum1 = 0;
var player3cardNum2 = 0;
var player3jocbo = ''
var user1score = 0;
var user2score = 0;
var user3score = 0;
var count = 0;
var Myasset = 10000;
var myBettedMoney = 0;
var diecount = 0;


class Game {
    cardArr = [];
    card
    check
    html


    constructor(card, check, html) {
        this.card = card
        this.check = check
        this.html = html
    }

    setGame() {
        turnNo = 0
        this.html.initHtml()
        this.check.checkAsset()
        this.cardArr = this.card.shufflecard()
        for (var i = 1; i < 4; i++) {
            var user = ('p' + i)
            this.distributeCard(user)
            count++
        }
    }

    distributeCard(user) {
        var user2 = (user + 1)
        var user3 = (user + 2)

        if (user == 'p1') {
            this.html.changeP1CardImg(user, user2, this.cardArr)
            player1cardNum1 = this.card.defineCard(player1cardNum1)
            player1cardNum2 = this.card.defineCard(player1cardNum2)
            player1jocbo = this.card.definejokbo(player1cardNum1, player1cardNum2)
            this.setScore(player1cardNum1, player1cardNum2, user)
        } else if (user == 'p2') {
            this.html.changeP2CardImg(user, user2, this.cardArr)
            player2cardNum1 = this.card.defineCard(player2cardNum1)
            player2cardNum2 = this.card.defineCard(player2cardNum2)
            player2jocbo = this.card.definejokbo(player2cardNum1, player2cardNum2)
            this.setScore(player2cardNum1, player2cardNum2, user)
        } else {
            this.html.changeP3CardImg(user, user2, this.cardArr)
            player3cardNum1 = this.card.defineCard(player3cardNum1)
            player3cardNum2 = this.card.defineCard(player3cardNum2)
            player3jocbo = this.card.definejokbo(player3cardNum1, player3cardNum2)
            this.html.setP3JocboDiv(user3, player3jocbo)
            this.setScore(player3cardNum1, player3cardNum2, user)
        }
    }

    setScore(cardNum1, cardNum2, user) {
        var aa = [cardNum1, cardNum2]
        aa.sort(function (a, b) {
            if (a > b) return 1;
            if (a === b) return 0;
            if (a < b) return -1;
        })
        aa = aa.join('')
        var dic = {

            "38": 0,
            "1010": 1,
            "99": 2,
            "88": 3,
            "77": 4,
            "66": 5,
            "55": 6,
            "44": 7,
            "33": 8,
            "22": 9,
            "11": 10,
            "12": 11,
            "14": 12,
            "19": 13,
            "110": 14,
            "410": 15,
            "46": 16,
        }


        if (aa in dic) {
            var score = dic[aa]
        } else {
            var score = 30 - (cardNum1 + cardNum2) % 10
        }

        if (user == 'p1') user1score = score
        else if (user == 'p2') user2score = score
        else user3score = score
    }

    setWinner() {
        var tr = [user1score, user2score, user3score]
        var winner = tr.sort(function (a, b) {
            if (a > b) return 1;
            if (a === b) return 0;
            if (a < b) return -1;
        })[0]
        if (winner == user1score) {
            this.html.setWinnerDiv(1)
            this.lose()
        }
        else if (winner == user2score) {
            this.html.setWinnerDiv(2)
            this.lose()
        }
        else {
            this.html.setWinnerDiv(3)
            this.win()
        }
        this.html.showOtherPlayer()
    }

    win() {
        Myasset += myBettedMoney * 3;
        myBettedMoney = 0;
        html.changeMyAssetDiv()
    }

    lose() {
        myBettedMoney = 0;
        html.changeMyAssetDiv()
    }
}

class Check extends Game {

    checkAsset() {
        if (Myasset < 0) {
            alert('더 이상 게임을 할 수 있는 자산이 없습니다.')
            location.replace('main.html');
        }
    }

    checkIsGameEnd() {
        if (count == 3) {
            alert('먼저 우승자를 확인해주세요')
            return 0
        }
    }

    checkIsGameStarted() {
        if (!(count == 3)) {
            alert('먼저 게임을 시작해주세요')
            return 0
        }
    }

    checkIsGaming() {
        if (count == 0) {
            alert('베팅은 게임 시작 후 가능합니다.')
            return 0
        }
    }

    checkIfDieSelected() {
        if (diecount == 1) {
            alert('이미 다이를 선택하셨습니다.')
            return 0
        }
    }

    checkIfAssetLeft(point) {
        if (Myasset - point < 0) {
            alert('더 이상 베팅이 불가합니다.');
            return 0
        }
    }

    checkIfAssetLeftGet(point) {
        if (Myasset - point < 0) {
            alert('자산이 부족합니다. ' + Myasset + '이하로 적어주세요.');
            return 0
        }
        if(point < 1) {
            alert('0보다 큰 값을 입력하세요.');
            return 0
        }
    }
}

class Card {
    cardArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    shufflecard() {
        var abc = 0;
        var change = 0;
        for (var i = 0; i < 50; i++) {
            change = Math.ceil(Math.random() * 19);
            abc = this.cardArr[0];
            this.cardArr[0] = this.cardArr[change];
            this.cardArr[change] = abc;
        }
        return this.cardArr
    }

    defineCard(card) {
        var cardNum = card

        if (cardNum == 0 || cardNum == 1) cardNum = 1
        else if (cardNum == 2 || cardNum == 3) cardNum = 2
        else if (cardNum == 4 || cardNum == 5) cardNum = 3
        else if (cardNum == 6 || cardNum == 7) cardNum = 4
        else if (cardNum == 8 || cardNum == 9) cardNum = 5
        else if (cardNum == 10 || cardNum == 11) cardNum = 6
        else if (cardNum == 12 || cardNum == 13) cardNum = 7
        else if (cardNum == 14 || cardNum == 15) cardNum = 8
        else if (cardNum == 16 || cardNum == 17) cardNum = 9
        else if (cardNum == 18 || cardNum == 19) cardNum = 10

        return (cardNum)
    }

    definejokbo(cardNum, cardNum2) {
        var jocbo = ''

        if ((cardNum == 3 && cardNum2 == 8) || (cardNum == 8 && cardNum2 == 3)) {
            jocbo = "38광땡"
        }
        else if (cardNum == cardNum2) {
            jocbo = (cardNum + "땡")
        }
        else if ((cardNum == 1 && cardNum2 == 2) || (cardNum == 2 && cardNum2 == 1)) {
            jocbo = "알리"
        }
        else if ((cardNum == 1 && cardNum2 == 4) || (cardNum == 4 && cardNum2 == 1)) {
            jocbo = "독사"
        }
        else if ((cardNum == 1 && cardNum2 == 9) || (cardNum == 9 && cardNum2 == 1)) {
            jocbo = "구삥"
        }
        else if ((cardNum == 1 && cardNum2 == 10) || (cardNum == 10 && cardNum2 == 1)) {
            jocbo = "장삥"
        }
        else if ((cardNum == 10 && cardNum2 == 4) || (cardNum == 4 && cardNum2 == 10)) {
            jocbo = "장사"
        }
        else if ((cardNum == 4 && cardNum2 == 6) || (cardNum == 6 && cardNum2 == 4)) {
            jocbo = "세륙"
        }
        else {
            var dd = ((cardNum + cardNum2) % 10)
            if (dd == 9) {
                jocbo = "갑오"
            } else if (dd == 0) {
                jocbo = "망통"
            } else jocbo = (dd + "끗")
        }
        return jocbo
    }
}

class Html extends Game {

    initHtml() {
        document.getElementById('number').innerHTML = "<input type='number'  min='200' max=" + (Myasset - 200) + " step='100' class='inputnum' id='gotoget'>";
        document.getElementById('result').innerHTML = ""
        document.getElementById('mypick').innerHTML = ""
        document.getElementById('cardhover1').style.display = 'flex';
        document.getElementById('cardhover2').style.display = 'flex';
        document.querySelector('.winner').style.display = 'none';
        document.getElementById('p12').innerHTML = '';
        document.getElementById('p22').innerHTML = '';
        document.getElementById('betted').innerHTML = ("배팅금 : 200 원")
    }

    changeP1CardImg(user, user2, cardArray) {
        var cardArr = cardArray
        document.getElementById(user).innerHTML = "<img src='images/card/p1/pae" + cardArr[turnNo] + ".png'  class='cardrotated'>";
        player1cardNum1 = cardArr[turnNo]
        turnNo++
        document.getElementById(user2).innerHTML = "<img src='images/card/p1/pae" + cardArr[turnNo] + ".png' class='cardrotated'>";
        player1cardNum2 = cardArr[turnNo]
        turnNo++;
    }

    changeP2CardImg(user, user2, cardArray) {
        var cardArr = cardArray
        document.getElementById(user).innerHTML = "<img src='images/card/p2/pae" + cardArr[turnNo] + ".png' class='cardrotated'>";
        player2cardNum1 = cardArr[turnNo]
        turnNo++;
        document.getElementById(user2).innerHTML = "<img src='images/card/p2/pae" + cardArr[turnNo] + ".png' class='cardrotated'>";
        player2cardNum2 = cardArr[turnNo]
        turnNo++;
    }

    changeP3CardImg(user, user2, cardArray) {
        var cardArr = cardArray
        document.getElementById(user).innerHTML = "<img src='images/card/pae" + cardArr[turnNo] + ".png' class='mymaincard'>";
        player3cardNum1 = cardArr[turnNo]
        turnNo++;
        document.getElementById(user2).innerHTML = "<img src='images/card/pae" + cardArr[turnNo] + ".png' class='mymaincard'>";
        player3cardNum2 = cardArr[turnNo]
        turnNo++;
    }

    setWinnerDiv(winner) {
        document.querySelector('.winner').style.display = 'flex';
        document.getElementById('result').innerHTML = "Player" + winner + " Win!";
    }

    setP3JocboDiv(user, player3jocbo) {
        document.getElementById(user).innerHTML = player3jocbo
    }

    showOtherPlayer() {
        document.getElementById('p12').innerHTML = player1jocbo;
        document.getElementById('p22').innerHTML = player2jocbo;
        document.getElementById('cardhover1').style.display = 'none';
        document.getElementById('cardhover2').style.display = 'none';
    }

    changeMyAssetDiv() {
        document.getElementById('money').innerHTML = "내자산 : " + Myasset;
    }

    betSelected(bet) {
        document.getElementById('mypick').innerHTML = bet
        document.getElementById('betted').innerHTML = ("배팅금 : " + myBettedMoney + " 원")
    }

}

class Betting extends Game {

    callatstart() {
        myBettedMoney += 200
        Myasset -= 200
        html.changeMyAssetDiv()
    }

    call() {
        if (check.checkIfDieSelected() == 0) return
        if (check.checkIfAssetLeft(200) == 0) return
        myBettedMoney += 200
        Myasset -= 200
        html.changeMyAssetDiv()
        html.betSelected('콜')
    }

    die() {
        if (check.checkIfDieSelected() == 0) return
        myBettedMoney = 0;
        html.changeMyAssetDiv()
        html.betSelected('다이')
        diecount = 1;
    }

    allin() {
        if (check.checkIfDieSelected() == 0) return
        if (check.checkIfAssetLeft(1) == 0) return
        myBettedMoney += Myasset
        Myasset = 0
        html.changeMyAssetDiv()
        html.betSelected('올인')
    }

    double() {
        if (check.checkIfDieSelected() == 0) return
        if (check.checkIfAssetLeft(400) == 0) return
        myBettedMoney += 400
        Myasset -= 400
        html.changeMyAssetDiv()
        html.betSelected('따당')
    }

    get() {
        if (check.checkIfDieSelected() == 0) return
        var nums = document.getElementById("gotoget");
        var gotogetnum = parseInt(nums.value)
        if(Number.isInteger(gotogetnum) == false) {
            alert('숫자만 입력해 주세요')
            return
        }
        if (check.checkIfAssetLeftGet(gotogetnum) == 0) return
        myBettedMoney += gotogetnum
        Myasset -= gotogetnum
        html.changeMyAssetDiv()
        html.betSelected('사용자 지정')
    }


}


const card = new Card()
const check = new Check()
const html = new Html()
const betting = new Betting()
const game = new Game(card, check, html)


function getCard() {
    if (check.checkIsGameEnd() == 0) return
    betting.callatstart()
    game.setGame()
}

function getResult() {
    if (check.checkIsGameStarted() == 0) return
    game.setWinner()
    count = 0
    diecount = 0
}

function call() {
    if (check.checkIsGaming() == 0) return
    betting.call()
}

function die() {
    if (check.checkIsGaming() == 0) return
    betting.die()
}

function allin() {
    if (check.checkIsGaming() == 0) return
    betting.allin()
}

function double() {
    if (check.checkIsGaming() == 0) return
    betting.double()
}

function get() {
    if (check.checkIsGaming() == 0) return
    betting.get()
}
