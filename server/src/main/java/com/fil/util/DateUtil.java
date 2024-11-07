package com.fil.util;

import java.time.*;
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

    public static Date convertToDate(LocalDate localDate) {
        ZoneId zoneId = ZoneId.systemDefault();
        ZonedDateTime zonedDateTime = localDate.atStartOfDay(zoneId);
        Instant instant = zonedDateTime.toInstant();
        return Date.from(instant);
    }

    public static LocalDate convertToLocalDate(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    public static String convertToLocalDateString(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().toString();
    }

}
