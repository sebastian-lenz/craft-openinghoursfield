<?php

namespace lenz\openinghoursfield\models;

use craft\base\Model;
use lenz\openinghoursfield\helpers\DateHelpers;

/**
 * Class TimeRange
 */
class TimeRange extends Model
{
  /**
   * @var int
   */
  public int $closes = 0;

  /**
   * @var int
   */
  public int $opens = 0;

  /**
   * @var string
   */
  public string $uid;

  /**
   * Linking data representing a closed time range
   */
  const LD_CLOSED = [
    '@type' => 'OpeningHoursSpecification',
    'opens' => '00:00',
    'closes' => '00:00',
  ];

  /**
   * Linking data representing an all day time range
   */
  const LD_ALL_DAY = [
    '@type' => 'OpeningHoursSpecification',
    'opens' => '00:00',
    'closes' => '23:59',
  ];


  /**
   * @inheritDoc
   * @noinspection PhpMissingReturnTypeInspection
   */
  public function rules(): array {
    return array_merge(parent::rules(), [
      [['closes', 'opens', 'uid'], 'required'],
      [['closes', 'opens'], 'each', 'rule' => ['integer', 'min' => 0, 'max' => DateHelpers::ONE_DAY]],
      ['uid', 'string'],
    ]);
  }

  /**
   * @return array
   */
  public function toJson(): array {
    return [
      'closes' => $this->closes,
      'opens' => $this->opens,
      'uid' => $this->uid,
    ];
  }

  /**
   * @return array
   */
  public function toLinkingData(): array {
    return [
      '@type' => 'OpeningHoursSpecification',
      'opens' => DateHelpers::formatTime($this->opens),
      'closes' => DateHelpers::formatTime($this->closes),
    ];
  }
}
