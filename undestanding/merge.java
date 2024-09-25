package undestanding;

public class merge {

    public static void play(int a[]) {
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i] + " ");
        }
    }

    public static void main(String[] args) {
        int[] a = {7, 3, 2, 5, 4};
        mergeSort(a, 0, a.length - 1);
        play(a);
    }

    // Recursive merge sort function
    public static void mergeSort(int[] a, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;

            // Sort first and second halves
            mergeSort(a, left, mid);
            mergeSort(a, mid + 1, right);

            // Merge the sorted halves
            merge(a, left, mid, right);
        }
    }

    // Function to merge two halves
    public static void merge(int[] a, int left, int mid, int right) {
        int n1 = mid - left + 1; // Size of the first half
        int n2 = right - mid;    // Size of the second half

        // Temporary arrays
        int[] leftArray = new int[n1];
        int[] rightArray = new int[n2];

        // Copy data to temporary arrays
        for (int i = 0; i < n1; i++)
            leftArray[i] = a[left + i];
        for (int j = 0; j < n2; j++)
            rightArray[j] = a[mid + 1 + j];

        // Merge the temporary arrays
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (leftArray[i] <= rightArray[j]) {
                a[k] = leftArray[i];
                i++;
            } else {
                a[k] = rightArray[j];
                j++;
            }
            k++;
        }

        // Copy remaining elements of leftArray[]
        while (i < n1) {
            a[k] = leftArray[i];
            i++;
            k++;
        }

        // Copy remaining elements of rightArray[]
        while (j < n2) {
            a[k] = rightArray[j];
            j++;
            k++;
        }
    }
}
