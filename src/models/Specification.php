<?php

namespace lenz\openinghoursfield\models;

use craft\base\Model;
use Exception;
use lenz\craft\utils\validators\ModelArrayValidator;
use lenz\craft\utils\validators\ModelValidator;
use lenz\openinghoursfield\helpers\DateHelpers;

/**
 * Class Specification
 *
 * @property TimeRange[] $timeRanges
 * @property Validity $validity
 */
class Specification extends Model
{
  /**
   * @var string
   */
  public $state = 'closed';

  /**
   * @var string
   */
  public $uid;

  /**
   * @var TimeRange[]
   */
  private $_timeRanges = [];

  /**
   * @var Validity
   */
  private $_validity;


  /**
   * @return string
   */
  public function getJsCondition() {
    $condition = $this->validity->getJsCondition();
    $json = json_encode([
      'state' => $this->state,
      'times' => array_map(function(TimeRange $timeRange) {
        return [
          DateHelpers::formatTime($timeRange->opens),
          DateHelpers::formatTime($timeRange->closes)
        ];
      }, $this->state == 'opened' ? $this->_timeRanges : [])
    ]);

    return "if($condition)return$json;";
  }

  /**
   * @return int
   */
  public function getPriority(): int{
    return $this->_validity->getPriority();
  }

  /**
   * @return TimeRange[]
   */
  public function getTimeRanges(): array {
    return $this->_timeRanges;
  }

  /**
   * @return Validity
   */
  public function getValidity(): Validity {
    return $this->_validity;
  }

  /**
   * @inheritDoc
   */
  public function init() {
    parent::init();

    if ($this->state == 'closed') {
      $this->_timeRanges = [];
    } else {
      usort($this->_timeRanges, function(TimeRange $lft, TimeRange $rgt) {
        return $lft->opens == $rgt->opens
          ? $lft->closes - $rgt->closes
          : $lft->opens - $rgt->opens;
      });
    }
  }

  /**
   * @return bool
   */
  public function isNever(): bool {
    return $this->_validity->isNever();
  }

  /**
   * @inheritDoc
   * @noinspection PhpMissingReturnTypeInspection
   */
  public function rules() {
    return array_merge(parent::rules(), [
      [['state', 'timeRanges', 'uid', 'validity'], 'required'],
      ['state', 'in', 'range' => ['closed', 'opened']],
      ['timeRanges', ModelArrayValidator::class, 'modelClass' => TimeRange::class],
      ['uid', 'string'],
      ['validity', ModelValidator::class, 'modelClass' => Validity::class],
    ]);
  }

  /**
   * @param mixed $value
   * @throws Exception
   */
  public function setTimeRanges($value) {
    if (!is_array($value)) {
      $value = [$value];
    }

    $this->_timeRanges = array_map(function($value) {
      return $value instanceof TimeRange ? $value : new TimeRange($value);
    }, $value);
  }

  /**
   * @param mixed $value
   * @throws Exception
   */
  public function setValidity($value) {
    if (!($value instanceof Validity)) {
      $value = Validity::create($value);
    }

    $this->_validity = $value;
  }

  /**
   * @return array
   */
  public function toJson(): array {
    return [
      'state' => $this->state,
      'timeRanges' => $this->_timeRanges,
      'uid' => $this->uid,
      'validity' => $this->_validity->toJson(),
    ];
  }

  /**
   * @return array
   */
  public function toLinkingData(): array {
    if ($this->state == 'closed') {
      $timeSpecs = [TimeRange::LD_CLOSED];
    } elseif (count($this->_timeRanges) == 0) {
      $timeSpecs = [TimeRange::LD_ALL_DAY];
    } else {
      $timeSpecs = array_map(function(TimeRange $timeRange) {
        return $timeRange->toLinkingData();
      }, $this->_timeRanges);
    }

    $result = [];
    foreach ($timeSpecs as $timeSpec) {
      $result = array_merge($result, $this->_validity->toLinkingData($timeSpec));
    }

    return $result;
  }
}
