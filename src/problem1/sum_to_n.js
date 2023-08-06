// Method 1: uses a for loop
function sum_to_n_a(n) {
    let res = 0;
    for (let i = 1; i <= n; i++) {
        res += i;
    }
    return res;
}

// Method 2: uses recursion
function sum_to_n_b(n) {
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n_b(n - 1);
}

// Method 3: uses arithmetic progression formula
// in this case: a1 = 1, d = 1, n = 5
// the sum of the arithmetic progression is (first term + last term) * number of terms / 2
function sum_to_n_c(n) {
    return ((n + 1) * n) / 2;
}

console.log(`First Sum Method: ${sum_to_n_a(5)}`);
console.log(`Second Sum Method: ${sum_to_n_b(5)}`);
console.log(`Third Sum Method: ${sum_to_n_c(5)}`);
