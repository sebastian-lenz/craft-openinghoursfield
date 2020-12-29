<?php

namespace lenz\openinghoursfield\models\validities;

use lenz\openinghoursfield\helpers\DateHelpers;
use lenz\openinghoursfield\models\Validity;

/**
 * Class MonthsValidity
 */
class MonthsValidity extends AlwaysValidity
{
  /**
   * @var int[]
   */
  public $months = [];


  /**
   * @inheritDoc
   */
  public function getJsCondition(): string {
    $json = json_encode(array_map(function($group) {
      return [intval($group['min']), intval($group['max'])];
    }, $this->getMonthGroups()));

    $condition = implode('', [
      $json, '.filter(function(r){return ',
        'value.getMonth()>=r[0]&&',
        'value.getMonth()<=r[1]',
      '}).length>=0'
    ]);

    return parent::getJsCondition() . '&&' . $condition;
  }

  /**
   * @inheritDoc
   */
  public function init() {
    parent::init();
    sort($this->months);
  }

  /**
   * @inheritDoc
   */
  public function isNever(): bool {
    return parent::isNever() || count($this->months) == 0;
  }

  /**
   * @return array
   */
  public function getMonthGroups(): array {
    $groups = [];
    $months = $this->months;
    sort($months);

    foreach ($months as $month) {
      $lastIndex = count($groups) - 1;

      if ($lastIndex >= 0 && $groups[$lastIndex]['max'] == $month - 1) {
        $groups[$lastIndex]['max'] = $month;
      } else {
        $groups[] = [
          'min' => $month,
          'max' => $month,
        ];
      }
    }

    return $groups;
  }

  /**
   * @inheritDoc
   * @noinspection PhpMissingReturnTypeInspection
   */
  public function rules() {
    return array_merge(parent::rules(), [
      ['months', 'required'],
      ['months', 'each', 'rule' => ['integer', 'min' => 1, 'max' => 12]],
    ]);
  }

  /**
   * @inheritDoc
   */
  public function toJson(): array {
    return [
      'months' => $this->months,
      'type' => 'months',
      'weekDays' => $this->weekDays,
    ];
  }

  /**
   * @param array $timeSpec
   * @return array
   */
  public function toLinkingData(array $timeSpec): array {
    return array_map(function($group) use ($timeSpec) {
      ['min' => $min, 'max' => $max] = $group;
      $year = date('Y') + (date('m') > $max ? 1 : 0);
      $maxDay = DateHelpers::daysInMonth($max, $year);

      return array_merge($timeSpec, [
        'dayOfWeek' => DateHelpers::toDaysOfWeek($this->weekDays),
        'validFrom' => sprintf('%04d-%02d-01', $year, $min + 1),
        'validThrough' => sprintf('%04d-%02d-%02d', $year, $max + 1, $maxDay),
      ]);
    }, $this->getMonthGroups());
  }
}
