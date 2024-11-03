package com.fil.util;

public class ArrayUtils {

	public static int indexOf(Object[] arr, String text) {
		for (int i = 0; i < arr.length; i++) {
			if (arr[i] instanceof String) {
				if (((String) arr[i]).equals(text)) {
					return i;
				}
			}
		}
		return -1;
	}

}
