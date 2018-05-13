'usestrict';

function countDecimals(num) {
    return (num.toString().split('.')[1] || []).length;
}

function isOdd(num) {
    return num % 2;
}

function findNextSquare(sq) {
    var result = 0;
    var sqrt = Math.sqrt(sq);

    if (countDecimals(sqrt) == 0) {
        result = (sqrt + 1) * (sqrt + 1); // perfectSquare, search next one
    } else {
        result = -1;
    }
    console.debug(sq + " -> " + result);
    return result;
}

function accum(s) {
    var chars = s.split('');
    var result = "";
    for (var i = 0; i < chars.length; i++) {
        var char = chars[i];
        var countLetterToAppend = i + 1;
        for (var appendIndex = 0; appendIndex < (i + 1); appendIndex++) {
            result += (appendIndex == 0 ? char.toUpperCase() : char.toLowerCase());
        }
        if (i < chars.length - 1) {
            result += "-";
        }
    }
    console.debug(s + " -> " + result);
    return result;
}

// Java Set
function toSet(A) {
    let dummyJson = {};
    let uniqueOnes = [];
    for (let i = 0; i < A.length; i++) {
        let digit = A[i];
        if (!dummyJson.hasOwnProperty(digit)) {
            dummyJson[digit] = digit;
            uniqueOnes.push(digit);
        }
    }
    return uniqueOnes;
}


function findOdd(A) {
    let result = -1;
    let uniqueOnes = toSet(A);

    for (let i = 0; i < uniqueOnes.length; i++) {
        let uniqueDigit = uniqueOnes[i];
        let countAppear = 0;
        let toCompare;

        for (let y = 0; y < A.length; y++) {
            toCompare = A[y];

            if (toCompare == uniqueDigit) {
                countAppear++;
            }
        }
        if (isOdd(countAppear)) { // odd
            result = uniqueDigit;
            break;
        }
    }
    console.debug(A + " -> " + result);
    return result;
}

function duplicateEncode(word) {
    let result = "";
    let letters = word.split("");
    let countAppear = 0;
    letters.forEach(function (letter) {
        countAppear = 0;
        letters.forEach(function (letterToCompare) {
            if (letter.toUpperCase() === letterToCompare.toUpperCase()) {
                countAppear++;
            }
        });
        result += (countAppear === 1 ? "(" : ")");
    });
    console.debug(word + " -> " + result);
    return result;
}

function iqTest(numbers) {
    numbers = numbers.split(' ');
    let result = 0;
    let indexesOdd = [];
    let indexesEven = [];
    for (let i = 0; i < numbers.length; i++) {

        if (isOdd(numbers[i])) {
            indexesOdd.push(i + 1);
        }
        else {
            indexesEven.push(i + 1);
        }
    }
    return (indexesOdd.length <= indexesEven.length ? indexesOdd[0] : indexesEven[0]);
}

function likes(names) {
    let result = "";
    if (names == null || names.length == 0) {
        result = "no one likes this";
    } else if (names.length === 1) {
        result = names[0] + " likes this";
    }
    else if (names.length === 2) {
        result = names[0] + " and " + names[1] + " like this";
    }
    else if (names.length === 3) {
        result = names[0] + ", " + names[1] + " and " + names[2] + " like this";
    } else {
        let diff = names.length - 2;
        result = names[0] + ", " + names[1] + " and " + diff + " others like this";
    }
    return result;
}

var uniqueInOrder = function (iterable) {
    let result = [];
    let sequenceArray = (Array.isArray(iterable) ? iterable : iterable.split(''));
    let charUnique;

    for (var i = 0; i < sequenceArray.length; i++) {
        let currentChar = sequenceArray[i];

        if (i == 0) {
            charUnique = sequenceArray[0];
            result.push(charUnique);
        }

        if (currentChar != charUnique) {
            result.push(currentChar);
            charUnique = sequenceArray[i];
        }
    }
    return result;
}

function getCrossSum(num) {
    let result = 0;
    num.toString().split('').forEach(function (digit) {
        result += parseInt(digit);
    });
    return result;
}

function digital_root(n) {
    let result = n;
    while (true) {
        if (result == null || result.toString().length <= 1) {
            break;
        }
        result = getCrossSum(result);
    }
    return result;
}

function isValidWalk(walk) {
    let xCoordinate = 0;
    let yCoordinate = 0;
    let ok = (walk.length === 10 ? true : false);

    if (ok) {
        walk.forEach(function (direction) {
            if (direction === 'n') {
                yCoordinate++;
            }
            else if (direction === 's') {
                yCoordinate--;
            }
            else if (direction === 'e') {
                xCoordinate++;
            }
            else if (direction === 'w') {
                xCoordinate--;
            }
            console.debug(direction);
        });
        ok = (xCoordinate == 0 && yCoordinate == 0 ? true : false);
        console.debug("x " + xCoordinate + ",y " + yCoordinate);
    }
    return "'should return " + (ok ? "true" : "false");
}

function tickets(peopleInLine) {
    let ok = true;
    let billCount_25 = 0;
    let billCount_50 = 0;
    let billCount_100 = 0;

    for (let i = 0; i < peopleInLine.length; i++) {
        let bill = peopleInLine[i];
        let change = bill - 25;

        console.debug("bill " + bill + ", change " + change + ", 25# " + billCount_25 + ", 50# " + billCount_50 + ", 100# " + billCount_100);

        if (change > 0) {
            let count50got = 0;
            for (let i = 0; i < billCount_50; i++) {
                if (change >= 50) {
                    change -= 50;
                    count50got++;
                }
            }
            billCount_50 -= count50got;
        }

        if (change > 0) {
            let count25got = 0;
            for (let i = 0; i < billCount_25; i++) {
                if (change >= 25) {
                    change -= 25;
                    count25got++;
                }
            }
            billCount_25 -= count25got;
        }

        if (change != 0) {
            ok = false;
            break;
        }

        if (bill === 25) {
            billCount_25++;
        }
        else if (bill === 50) {
            billCount_50++;
        }
        else if (bill === 100) {
            billCount_100++;
        }
    }
    return (ok ? "TRUE" : "FALSE");
}


/*
    muliples of 3 or 5
 */
function solution(number) {
    let result = 0;
    for (var currentNum = number - 1; currentNum > 1; currentNum--) {
        if (currentNum % 3 === 0) {
            result += currentNum;
        } else if (currentNum % 5 === 0) {
            result += currentNum;
        }
    }
    return result;
}

function amidakuji(ar){
    let indexes = {};
    indexes["indexDigit1"] = 0;
    indexes["indexDigit2"] = 0;
    indexes["indexDigit3"] = 0;
    indexes["indexDigit4"] = 0;
    indexes["indexDigit5"] = 0;
    indexes["indexDigit6"] = 0;

    ar.forEach(function (ladderChunk) {
        let rungsEmptyspaces = ladderChunk.split('');


        console.debug("next "+ rungsEmptyspaces);
    });

    console.debug(JSON.stringify(indexes));
}


let ladder = [
    '001001',
    '010000',
    '100100',
    '001000',
    '100101',
    '010010',
    '101001',
    '010100'
];

 console.debug("amidakuji(ladder); expected: [4, 2, 0, 5, 3, 6, 1], result " + amidakuji(ladder));
//console.debug("solution(10); expected: 23, result " + solution(10));
//console.debug("solution(10); expected: 23, result " + solution(100000));


//findOdd([1,1,1,1,1,1,10,1,1,1,1]);
//findOdd([ 20, 1, 1, 2, 2, 3, 3, 5, 5, 4, 20, 4, 5 ]
//duplicateEncode("din"); //"((("
//duplicateEncode("recede"); //"()()()"
//duplicateEncode("Success"); //")())())"
//duplicateEncode("(( @"); //"))(("
//console.debug("iqTest('2 4 7 8 10'); expected: 3, result " + iqTest("2 4 7 8 10"));
//console.debug("likes([]); expected: 'no one likes this', result '" + likes([])+ "'");
//console.debug("likes(['Peter']); expected: 'Peter likes this', result '" + likes(['Peter'])+ "'");
//console.debug("likes(['Jacob', 'Alex']); expected: 'Jacob and Alex like this', result '" + likes(['Jacob', 'Alex'])+ "'") ;
//console.debug("likes(['Max', 'John', 'Mark']); expected: 'Max, John and Mark like this', result '" + likes(['Max', 'John', 'Mark'])+ "'");
//console.debug("likes(['Alex', 'Jacob', 'Mark', 'Max']); expected: 'Alex, Jacob and 2 others like this', result '" + likes(['Alex', 'Jacob', 'Mark', 'Max'])+ "'");
//console.debug("uniqueInOrder('AAAABBBCCDAABBB'); expected: ['A','B','C','D','A','B'], result " + uniqueInOrder('AAAABBBCCDAABBB'));
//console.debug("uniqueInOrder([1,2,3]); expected: [1,2,3], result " + uniqueInOrder([1,2,3]));
//console.debug("digital_root(16); expected: 7, result " + digital_root(16));
//console.debug("isValidWalk(['n','s','n','s','n','s','n','s','n','s']); expected: 'should return true', result " + isValidWalk(['n', 's', 'n', 's', 'n', 's', 'n', 's', 'n', 's']) + "'");
//console.debug("isValidWalk(['w']); expected: 'should return false', result " + isValidWalk(['w']) + "'");
//console.debug("tickets([25,25,50,100,25,50,25,100,25,25,50,100,25,50,50,100]); expected: 'YES', result " + tickets([25,25,50,100,25,50,25,100,25,25,50,100,25,50,50,100]));


