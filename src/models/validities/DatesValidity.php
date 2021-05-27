<?php

namespace lenz\openinghoursfield\models\validities;

use lenz\openinghoursfield\helpers\DateHelpers;
use lenz\openinghoursfield\models\Validity;

/**
 * Class DatesValidity
 */
class DatesValidity extends Validity
{
  /**
   * @var string[]
   */
  public $dates = [];


  /**
   * @inheritDoc
   */
  public function getJsCondition(): string {
    $json = json_encode(array_map(function($date) {
      return DateHelpers::parseJsDate($date);
    }, $this->dates));

    return implode('', [
      $json, '.filter(function(d){return ',
        'v.getFullYear()==d[0]&&',
        'v.getMonth()==d[1]&&',
        'v.getDay()==d[2]',
      '}).length>0'
    ]);
  }

  /**
   * @inheritDoc
   */
  public function init() {
    parent::init();
    sort($this->dates);
  }

  /**
   * @inheritDoc
   */
  public function isNever(): bool {
    return count($this->dates) == 0;
  }

  /**
   * @return array
   * @noinspection PhpMissingReturnTypeInspection
   */
  public function rules() {
    return array_merge(parent::rules(), [
      ['dates', 'required'],
      ['dates', 'each', 'rule' => ['match', 'pattern' => DateHelpers::DATE_REGEXP]]
    ]);
  }

  /**
   * @inheritDoc
   */
  public function toJson(): array {
    return [
      'type' => 'dates',
      'dates' => $this->dates,
    ];
  }

  /**
   * @inheritDoc
   */
  public function toLinkingData(array $timeSpec): array {
    return array_map(function($date) use ($timeSpec) {
      return array_merge($timeSpec, [
        'validFrom' => $date,
        'validThrough' => $date,
      ]);
    }, $this->dates);
  }
}
