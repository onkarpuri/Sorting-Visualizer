package undestanding;

public class insertion {

    public static void play(int a[]) {
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i] + " ");
        }
    }

    public static void main(String[] args) {
        int[] a = {7, 3, 2, 5, 4};
        for (int i = 1; i < a.length; i++) {
            int key = a[i]; // Element to be placed at the correct position
            int j = i - 1;

            // Move elements greater than key to one position ahead of their current position
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                j = j - 1;
            }
            a[j + 1] = key; // Place key at the correct position
        }
        play(a);
    }
}
