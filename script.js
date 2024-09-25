let array = [];
let isStopped = false;
let isPaused = false;
const container = document.getElementById('array-container');

// Generate a new random array
function generateArray() {
    array = [];
    container.innerHTML = ''; // Clear container
    for (let i = 0; i < 20; i++) {
        let value = Math.floor(Math.random() * 100) + 1;
        array.push(value);

        // Create bar element
        const bar = document.createElement('div');
        bar.style.height = `${value * 3}px`;
        bar.classList.add('bar');
        container.appendChild(bar);
    }
}

// Swap two bars in the DOM
function swap(i, j) {
    const bars = document.getElementsByClassName('bar');
    let tempHeight = bars[i].style.height;
    bars[i].style.height = bars[j].style.height;
    bars[j].style.height = tempHeight;
}

// Sleep with respect to stop/resume functionality
async function controlledSleep(ms) {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (!isPaused) {
                clearInterval(interval);
                resolve();
            }
        }, ms);
    });
}

// Bubble Sort (O(n²))
async function bubbleSort() {
    isStopped = false;
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1 && !isStopped; i++) {
        for (let j = 0; j < array.length - i - 1 && !isStopped; j++) {
            bars[j].classList.add('swapping');
            bars[j + 1].classList.add('swapping');
            await controlledSleep(800); // Delay for visualization

            if (array[j] > array[j + 1]) {
                swap(j, j + 1);
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }

            bars[j].classList.remove('swapping');
            bars[j + 1].classList.remove('swapping');
        }
        bars[array.length - i - 1].classList.add('sorted');
    }
    bars[0].classList.add('sorted');
}

// Selection Sort (O(n²))
async function selectionSort() {
    isStopped = false;
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length && !isStopped; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length && !isStopped; j++) {
            bars[j].classList.add('swapping');
            await controlledSleep(800); // Delay for visualization

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            bars[j].classList.remove('swapping');
        }
        if (minIndex !== i) {
            swap(i, minIndex);
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
        }
        bars[i].classList.add('sorted');
    }
}

// Insertion Sort (O(n²))
async function insertionSort() {
    isStopped = false;
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length && !isStopped; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].classList.add('swapping');
        await controlledSleep(800); // Delay for visualization

        while (j >= 0 && array[j] > key && !isStopped) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = bars[j].style.height;
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;

        bars[i].classList.remove('swapping');
        bars[i].classList.add('sorted');
    }
    bars[0].classList.add('sorted');
}

// Merge Sort (O(n log n))
async function mergeSortWrapper() {
    isStopped = false;
    await mergeSort(0, array.length - 1);
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.add('sorted');
    }
}

async function mergeSort(l, r) {
    if (l >= r || isStopped) return;

    const m = Math.floor((l + r) / 2);
    await mergeSort(l, m);
    await mergeSort(m + 1, r);
    await merge(l, m, r);
}

async function merge(l, m, r) {
    const bars = document.getElementsByClassName('bar');
    let n1 = m - l + 1;
    let n2 = r - m;

    let leftArray = new Array(n1);
    let rightArray = new Array(n2);

    for (let i = 0; i < n1; i++) leftArray[i] = array[l + i];
    for (let i = 0; i < n2; i++) rightArray[i] = array[m + 1 + i];

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2 && !isStopped) {
        bars[k].classList.add('swapping');
        await controlledSleep(800); // Delay for visualization

        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            bars[k].style.height = `${leftArray[i] * 3}px`;
            i++;
        } else {
            array[k] = rightArray[j];
            bars[k].style.height = `${rightArray[j] * 3}px`;
            j++;
        }
        bars[k].classList.remove('swapping');
        k++;
    }

    while (i < n1 && !isStopped) {
        array[k] = leftArray[i];
        bars[k].style.height = `${leftArray[i] * 3}px`;
        i++;
        k++;
    }

    while (j < n2 && !isStopped) {
        array[k] = rightArray[j];
        bars[k].style.height = `${rightArray[j] * 3}px`;
        j++;
        k++;
    }
}

// Stop/Resume function
function toggleStopResume() {
    isPaused = !isPaused; // Toggles pause state
}

// Utility function to add delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate a new array when the page loads
window.onload = generateArray;
