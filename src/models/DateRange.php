<?php

namespace lenz\openinghoursfield\models;

use craft\base\Model;
use lenz\openinghoursfield\helpers\DateHelpers;

/**
 * Class DateRange
 *
 * @property int $fromTimeStamp
 * @property int $toTimeStamp
 */
class DateRange extends Model
{
  /**
   * @var string
   */
  public string $from = '';

  /**
   * @var string
   */
  public string $to = '';

  /**
   * @var string
   */
  public string $uid;


  /**
   * @return int
   */
  public function getFromTimeStamp(): int {
    return DateHelpers::parseDate($this->from);
  }

  /**
   * @return int
   */
  public function getToTimeStamp(): int {
    return DateHelpers::parseDate($this->to);
  }

  /**
   * @return string
   */
  public function getMaxDate(): string {
    return $this->getFromTimeStamp() > $this->getToTimeStamp()
      ? $this->from
      : $this->to;
  }

  /**
   * @return string
   */
  public function getMinDate(): string {
    return $this->getFromTimeStamp() < $this->getToTimeStamp()
      ? $this->from
      : $this->to;
  }

  /**
   * @inheritDoc
   */
  public function init(): void {
    parent::init();

    $min = $this->getMinDate();
    $max = $this->getMaxDate();
    $this->from = $min;
    $this->to = $max;
  }

  /**
   * @inheritDoc
   * @noinspection PhpMissingReturnTypeInspection
   */
  public function rules(): array {
    return array_merge(parent::rules(), [
      [['from', 'to', 'uid'], 'required'],
      [['from', 'to'], 'match', 'pattern' => DateHelpers::DATE_REGEXP],
      ['uid', 'string'],
    ]);
  }

  /**
   * @return array
   */
  public function toJson(): array {
    return [
      'from' => $this->getMinDate(),
      'to' => $this->getMaxDate(),
      'uid' => $this->uid,
    ];
  }


  // Static methods
  // --------------

  /**
   * @param DateRange $lft
   * @param DateRange $rgt
   * @return int
   */
  static public function compare(DateRange $lft, DateRange $rgt): int {
    $lftFrom = $lft->getFromTimeStamp();
    $rgtFrom = $rgt->getFromTimeStamp();

    return $lftFrom === $rgtFrom
      ? $lft->getToTimeStamp() - $rgt->getToTimeStamp()
      : $lftFrom - $rgtFrom;
  }
}
