<?php

namespace lenz\openinghoursfield\models\validities;

use lenz\craft\utils\models\ModelArrayValidator;
use lenz\openinghoursfield\helpers\DateHelpers;
use lenz\openinghoursfield\models\DateRange;
use lenz\openinghoursfield\models\Validity;

/**
 * Class RangesValidity
 *
 * @property DateRange[] $dateRanges
 */
class RangesValidity extends AlwaysValidity
{
  /**
   * @var DateRange[]
   */
  private $_dateRanges;


  /**
   * @return DateRange[]
   */
  public function getDateRanges(): array {
    return $this->_dateRanges;
  }

  /**
   * @inheritDoc
   */
  public function getJsCondition(): string {
    $json = json_encode(array_map(function(DateRange $dateRange) {
      return array_merge(
        DateHelpers::parseJsDate($dateRange->getMinDate()),
        DateHelpers::parseJsDate($dateRange->getMaxDate())
      );
    }, $this->_dateRanges));

    $condition = implode('', [
      $json, '.filter(function(r){return ',
        'value>=new Date(r[0],r[1],r[2])&&',
        'value<=new Date(r[3],r[4],r[5]+1)',
      '}).length>=0'
    ]);

    return parent::getJsCondition() . '&&' . $condition;
  }

  /**
   * @inheritDoc
   */
  public function init() {
    parent::init();
    usort($this->_dateRanges, [DateRange::class, 'compare']);
  }

  /**
   * @inheritDoc
   */
  public function isNever(): bool {
    return parent::isNever() || count($this->_dateRanges) == 0;
  }

  /**
   * @inheritDoc
   * @noinspection PhpMissingReturnTypeInspection
   */
  public function rules() {
    return array_merge(parent::rules(), [
      ['dateRanges', 'required'],
      ['dateRanges', ModelArrayValidator::class, 'modelClass' => DateRange::class]
    ]);
  }

  /**
   * @param mixed $value
   */
  public function setDateRanges($value) {
    if (!is_array($value)) {
      $value = [$value];
    }

    $this->_dateRanges = array_map(function($value) {
      return $value instanceof DateRange ? $value : new DateRange($value);
    }, $value);

  }

  /**
   * @inheritDoc
   */
  public function toJson(): array {
    return [
      'type' => 'ranges',
      'weekDays' => $this->weekDays,
      'dateRanges' => array_map(function(DateRange $dateRange) {
        return $dateRange->toJson();
      }, $this->dateRanges),
    ];
  }

  /**
   * @inheritDoc
   */
  public function toLinkingData(array $timeSpec): array {
    return array_map(function(DateRange $dateRange) use ($timeSpec) {
      return array_merge($timeSpec, [
        'dayOfWeek' => DateHelpers::toDaysOfWeek($this->weekDays),
        'validFrom' => $dateRange->getMinDate(),
        'validThrough' => $dateRange->getMaxDate(),
      ]);
    }, $this->_dateRanges);
  }
}
