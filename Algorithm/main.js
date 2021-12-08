let array =  [1, 2, 3, 3, 5, 3, 4, 5, 4, 4, 5];

C = (k, n) => {
    if (k == 0 || k == n) return 1;
    if (k == 1) return n;
    return C(k - 1, n - 1) + C(k, n - 1);
}

var counts = {};   
for (i = 0; i < array.length; i++) {
    let num = array[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
}

let result = 0
for (key in counts) {
    if (counts[key] > 1) {
        result += C(2, counts[key]);
    }
}
console.log(result);