<?php

namespace lenz\openinghoursfield\models\validities;

use lenz\openinghoursfield\helpers\DateHelpers;
use lenz\openinghoursfield\models\Validity;

/**
 * Class AlwaysValidity
 */
class AlwaysValidity extends Validity
{
  /**
   * @var int[]
   */
  public $weekDays = [];


  /**
   * @inheritDoc
   */
  public function getJsCondition(): string {
    return json_encode($this->weekDays) . '.indexOf(v.getDay())>0';
  }

  /**
   * @inheritDoc
   */
  public function init() {
    parent::init();
    sort($this->weekDays);
  }

  /**
   * @inheritDoc
   */
  public function isNever(): bool {
    return count($this->weekDays) == 0;
  }

  /**
   * @inheritDoc
   * @noinspection PhpMissingReturnTypeInspection
   */
  public function rules() {
    return array_merge(parent::rules(), [
      ['weekDays', 'required'],
      ['weekDays', 'each', 'rule' => ['integer', 'min' => 0, 'max' => 6]],
    ]);
  }

  /**
   * @inheritDoc
   */
  public function toJson(): array {
    return [
      'type' => 'always',
      'weekDays' => $this->weekDays,
    ];
  }

  /**
   * @inheritDoc
   */
  public function toLinkingData(array $timeSpec): array {
    return [
      array_merge($timeSpec, [
        'dayOfWeek' => DateHelpers::toDaysOfWeek($this->weekDays),
      ])
    ];
  }
}
