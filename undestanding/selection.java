//assume first to be smallest
//iterate through array and swap with the smallest index
//for second onward iteration - the 1 indexed element would be smallest and the comparison would start from 2nd index
//time complexity - O(n^2)
package undestanding;

public class selection {

    public static void play(int a[]) {
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i] + " ");
        }
    }

    public static void main(String[] args) {
        int[] a = { 7, 3, 2, 5, 4 };
        for (int i = 0; i < a.length - 1; i++) {
            int smallest = i;
            for (int j = i + 1; j < a.length; j++) {
                if (a[smallest] > a[j]) {
                    smallest = j;
                }
            }
            int temp = a[smallest];
            a[smallest] = a[i];
            a[i] = temp;
        }
        play(a);
    }
}