package com.fil.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

public class DateUtil {
	public static Date convertToDate(LocalDateTime localDateTime) {
		// Define the system default time zone
		ZoneId zoneId = ZoneId.systemDefault();

		// Convert LocalDateTime to ZonedDateTime
		ZonedDateTime zonedDateTime = localDateTime.atZone(zoneId);

		// Convert ZonedDateTime to Instant
		Instant instant = zonedDateTime.toInstant();

		// Convert Instant to Date
		return Date.from(instant);
	}

}
