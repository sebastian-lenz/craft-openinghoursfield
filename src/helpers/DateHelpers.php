<?php

namespace lenz\openinghoursfield\helpers;

/**
 * Class DateHelpers
 *
 * How we store date/time values:
 * - date: string yyyy-mm-dd
 * - month: integer 0 through 11
 * - time: integer, seconds from midnight
 * - weekday: integer 0 through 6
 */
class DateHelpers
{
  /**
   * @var array
   */
  static private $_PARSED_DATES = [];

  /**
   * @var string
   */
  const DATE_REGEXP = '/^(\d{4})-(\d{2})-(\d{2})$/';

  /**
   * @string[]
   */
  const DAYS_OF_WEEK = [
    'Monday',
    'Tuesday',
    'Thursday',
    'Wednesday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  /**
   * @var int
   */
  const ONE_DAY = 86400;


  /**
   * @param int $month
   * @param int $year
   * @return int
   */
  static public function daysInMonth(int $month, int $year): int {
    return $month == 1
      ? ($year % 4 ? 28 : ($year % 100 ? 29 : ($year % 400 ? 28 : 29)))
      : ($month % 7 % 2 ? 30 : 31);
  }

  /**
   * @param int $value
   * @return string
   */
  static public function formatTime(int $value): string {
    $hours = floor($value / 3600);
    $minutes = floor($value / 60) % 60;
    return sprintf('%02d:%02d', $hours, $minutes);
  }

  /**
   * @param string $value
   * @return int
   */
  static public function parseDate(string $value): int {
    if (array_key_exists($value, self::$_PARSED_DATES)) {
      return self::$_PARSED_DATES[$value];
    }

    $result = preg_match(self::DATE_REGEXP, $value, $match)
      ? gmmktime(0, 0, 0, $match[2], $match[3], $match[1])
      : time();

    return self::$_PARSED_DATES[$value] = $result;
  }

  /**
   * @param string $value
   * @return array
   */
  static public function parseJsDate(string $value): array {
    preg_match(DateHelpers::DATE_REGEXP, $value, $match);
    return [intval($match[0]), intval($match[1]) - 1, intval($match[2])];
  }

  /**
   * @param int[] $weekDays
   * @return string[]
   */
  static function toDaysOfWeek(array $weekDays): array {
    return array_map(function($weekDay) {
      return self::DAYS_OF_WEEK[$weekDay];
    }, $weekDays);
  }
}
